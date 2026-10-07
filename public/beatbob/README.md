# Deploy to mindarts.ru/beatbob/

Copy the entire folder to the server:

```
mindarts.ru/beatbob/
  index.html
  privacy.html
  img/
    hero.png      ← launch art (BeatBobLaunchPop)
    icon.png      ← app icon 1024
    skin-pop.png
    skin-rock.png
    skin-metal.png
    skin-edm.png
    skin-classical.png
```

## App Store Connect

| Field | URL |
|-------|-----|
| Privacy Policy | `http://mindarts.ru/beatbob/privacy.html` |
| Support | `http://mindarts.ru/beatbob/` |

## Assets

Images are copied from the app bundle — no AI generation needed:

- `img/hero.png` — [`BeatBob/Assets.xcassets/LaunchPop.imageset/BeatBobLaunchPop.png`](../../BeatBob/Assets.xcassets/LaunchPop.imageset/BeatBobLaunchPop.png)
- `img/icon.png` — app icon 1024×1024
- `img/skin-*.png` — bundled genre skins

After re-exporting art in Xcode, re-copy:

```bash
cp BeatBob/Assets.xcassets/LaunchPop.imageset/BeatBobLaunchPop.png docs/mindarts/beatbob/img/hero.png
cp BeatBob/Assets.xcassets/AppIcon.appiconset/BeatBob-AppIcon-1024_3.png docs/mindarts/beatbob/img/icon.png
```

## App Store

Button links to: https://apps.apple.com/gb/app/beat-bob/id6794845376
