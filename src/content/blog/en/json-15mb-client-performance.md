---
title: 'Client performance when JSON is over 15 MB'
description: 'How we sped up parsing huge iOS responses: library benchmarks, yyjson, hot paths, and predictable branches.'
pubDate: 2026-03-18
locale: en
translationSlug: json-15mb-client-performance
---

## The problem

Performance and load on the client when a JSON payload is larger than 15 MB.

> The CTO gathered us and started shaking a burning-hot phone with our app frozen on the splash screen. The owner staged the same scene for him. Whenever we objected, he said not to touch the backend — it was perfect.

## What we did

We frantically tried JSON parsing libraries. On device we measured not only milliseconds but also heat under repeated load, like a real user.

We ended up with this picture: BSON with parallel parsing ~1900 ms on the test volume; Zippy ~480 ms but hotter; system `JSONSerialization` ~500 ms and calmer thermally. Blindly swapping one library for another was not an option. For large domain models we moved to C/C++ solutions. They still win on speed, but even they must be used correctly.

**simdjson** is popular, but Swift interop from Apple does not fit a multi-module app. Otherwise it was very fast — on-demand parsing in native code and handing models up to Swift.

We chose **yyjson** and manual node walks (a JSON iterator and parsing by known keys). No extra reflection or intermediate `Dictionary` values; everything is parsed in the order it appears in JSON.

Example:

```swift
var iterator = yyjson_obj_iter_with(object)
var key: UnsafePointer<yyjson_val>?
var value: UnsafePointer<yyjson_val>?

while yyjson_obj_iter_next(&iterator, &key, &value) {
    switch jsonKey(key) {
    case .title:
        title = parseString(value)
    case .imageURL:
        imageURL = parseURL(value)
    case .items:
        items = parseItems(value)
    case .unknown:
        continue
    }
}
```

This code is less “pretty” in an academic sense than a single `try decoder.decode(Response.self, from: data)`. On the hot path it does less implicit work.

We did not stop there. We reduced branching in critical code. On hot paths (JSON parsing, field mapping, small model helpers) we deliberately flattened ladders of `if`/`else` and optional chains where code runs thousands of times per response.

Boring but effective:

- `switch` on a closed set of keys (`CodingKeys`, `@frozen enum` for config blocks) instead of long string comparison chains.
- `@inline(__always)` on narrow parser and network client functions — fewer calls, easier for the compiler to keep the hot path hot.

**Why it matters for performance:** modern CPU cores predict branches. The more predictable the structure in a loop over fields of a 15-megabyte response, the fewer pipeline stalls. That does not replace algorithmic complexity, but across hundreds of thousands of fields per session the difference adds up alongside other optimizations.

## Outcome

The app stays responsive on large data; fewer complaints like “the phone gets hot” and “everything slowed down after the update.” That directly affects retention in a consumer product.
