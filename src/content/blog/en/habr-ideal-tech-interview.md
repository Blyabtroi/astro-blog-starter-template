---
title: 'Script for the Ideal Technical Interview'
description: 'How technical interviews work at Delivery Club Tech: format, HR, the interviewer, and a scenario in five acts.'
pubDate: 2020-10-07
locale: en
translationSlug: habr-ideal-tech-interview
originalUrl: https://habr.com/ru/companies/deliveryclub/articles/522326/
---

> Originally published on [Habr](https://habr.com/ru/companies/deliveryclub/articles/522326/) (Russian). Full text in English below.

![](/blog/habr/522326/img-00.png)  
  

> Disclaimer: this is a script for the ideal technical interview at Delivery Club Tech. Our team’s view may not match readers’ opinions.

  
Hi, Habr! My name is Vasily Kozlov, and I’m an iOS tech lead at Delivery Club. I interview people often and a lot. In this article I’ve collected experience and observations I want to share. In the second part I’ll walk through an example _interview_ with commentary from my side. Let’s begin.  
  

## 1\. Interviews come in different colors: yellow, green, red (a lyrical digression)

  
There’s a view that hard technical _interviews_ don’t work. Alin Lerner, co-founder of the recruiting platform [Interviewing.io](https://interviewing.io), [wrote](https://www.freecodecamp.org/news/you-cant-fix-diversity-in-tech-without-fixing-the-technical-interview-here-s-the-data-93130f977da2/) that companies that hire based on difficult technical interviews _“spend resources on many candidates who don’t understand the game-like nature of interviews.”_ As a result, the people who make it to the finish line at such companies are often those who are good at passing interviews.  
  
Add the stress of interviews and the variety and unpredictability of technical questions across companies. Remember your own unexpected failures in those meetings. Statistics only confirm it: only about 25% of candidates can reveal and demonstrate their potential, and even top-tier specialists [fail](http://blog.interviewing.io/technical-interview-performance-is-kind-of-arbitrary-heres-the-data/) technical interviews in 22% of cases.  
  
This habit—asking hard, puzzle-like questions on technical interviews that have nothing to do with reality—showed up in the 1950s in the United States during the Cold War. The trend was set by Shockley’s semiconductor lab in the valley that had not yet been named Silicon, forced to recruit mad geniuses to counter the “red threat.” The inability to write code on a phone technical interview pushed interviewers to look for other ways to quickly assess analytical ability, intelligence, and a candidate’s potential. That’s how tasks about a counterfeit coin and two weighings appeared.  
  
In the 1990s, with the dot-com boom, hiring of technical specialists grew, and Microsoft adopted the approach from earlier decades. Google followed their example for a while.  
  
Later Google and Microsoft dropped popular puzzles from the “how do you move Mount Fuji” series. _“As for hiring, we found that brainteasers are a complete waste of time. How many golf balls can you fit in an airplane? How many gas stations are there in Manhattan? Total waste of time. They don’t predict anything. They serve to get the interviewer to feel smart,”_ Google’s senior VP of people operations [admitted](https://www.nytimes.com/2013/06/20/business/in-head-hunting-big-data-may-not-be-such-a-big-deal.html) in an interview with the New York Times.  
  
So there’s a view that hard technical _interviews_ don’t work, and I agree—so at Delivery Club I ran all technical interviews without asking questions like that. You can’t just walk in and pass one without the right preparation. Practical practice can take one or two months of going through the motions. That’s a normal process, and every colleague I’ve asked agrees one way or another.  
  
Computers made it possible to solve problems that didn’t exist before they did. Interview prep solves problems that often only show up in interviews. Very often that’s exactly what it is.  
  
From an IT hiring perspective, the IT industry in Russia isn’t standardized. Ways of assessing knowledge often take very elaborate forms. One of the dumbest examples I remember is a phone interview with an HR specialist who recorded the candidate’s answers to technical questions to pass them on to a technical specialist later. In that case any dialogue is ruled out—you can’t share an opinion or challenge an answer. Dialogue is also ruled out when the applicant faces an online multiple-choice test, sometimes the brainchild of another technical specialist with their own unique experience and grasp of English. In my view, English in development matters enough that sometimes it’s easier to communicate in it during an _interview_.  
  
Another interview pattern that’s explainable on one hand is employers wanting a psychological portrait of the applicant, warning that the “substantive interview” will be preceded by a meeting with a psychologist. The slickest employer in my experience still ran a technical interview and then offered a lie-detector test, arguing that the service costs money and there are many candidates.  
  
We should admit these are rare cases, and assessing technical knowledge usually boils down to a take-home assignment or an in-person meeting. How do you make these simple tools effective at finding the right technical specialist? First, as with any technical problem, you need to define requirements for the candidate… and for the _interview_.  
  

## 2\. The ideal format, the ideal candidate (defining requirements)

  
_“After every interview you should have a clear sense of whether this person can increase your company’s probability of success,”_ Neil Roseman [says](https://firstround.com/review/The-anatomy-of-the-perfect-technical-interview-from-a-former-Amazon-VP/) in “The Anatomy of the Perfect Technical Interview from a Former Amazon VP.” Those words may sound lofty to some, especially from a VP—even a former one—but they’re true. In the end you or your colleague will work with this candidate if they pass the _interview_.  
  
You can solve a technical problem by brushing up on theory; reaching a solution that works for every stakeholder takes understanding the shared goal plus cognitive and communication skills. Books won’t teach that—or they will, but without your own experience it doesn’t work. So soft skills become an integral part of the technical interview alongside the candidate’s professional knowledge (hard skills).  
  
Teamwork proved itself in crisis times when new challenges and uncertainty raise many questions. In that environment, the ability to hold a dialogue, propose hypotheses, and ask questions becomes foundational for an effective employee. The idea of combining getting to know a candidate’s _soft_ and _hard_ skills in one interview—a miniature workday—seemed very appealing but almost unattainable. Not everyone has that much time, and not always the legal ability to invite a candidate to dive into the boiling waters of building your product.  
  
Help came from a long-standing approach first used at Harvard Business School in 1924—the [situational interview](https://www.forbes.ru/karera-i-svoy-biznes/370295-korol-situacii-kak-proyti-keys-intervyu), or case interview. Roughly it splits into three big parts:  
  

*   the candidate’s values and views, soft skills;
*   professional skills and abilities, hard skills;
*   behavioral patterns and individual personality traits.

  
The question of how to combine a situational interview with well-known approaches to assessing technical knowledge stayed open. It’s important to offer the candidate a structured, transparent _interview_ plan and fit it into a modern developer’s tight schedule.  
  
According to statistics from Zety, a resume consulting service, in 2017 the most common approach remained iterative—several interview stages. The most popular variant [included](https://zety.com/blog/hr-statistics#job-interview-statistics) three interviews.  
  
A half-hour _call_ on Skype—the so-called screening—gives a general picture of the candidate and a decision on whether you want to keep talking, like a first date. What drives agreeing to the next meeting if not an effective demonstration of _soft skills_? It’s very important that this be a video call, not guessing from a photo. Screening questions should also build a picture of the candidate’s values: views on team roles, interaction effectiveness, their own role, effectiveness, and competence. It doesn’t hurt to ask personally about motives for changing jobs and find overlap by skimming the candidate’s personal _[tech radar](https://bit.ly/DC_techradar)_, _things like_ favorite TV shows.  
  
Of course, the epidemiological situation in the world shifted things, and Zoom displaced Skype, but screening was and remains our constant first stage.  
  
I’ll jump ahead, leaving the best for later, and mention the third stage—the final—not everyone reaches it. Like meeting the parents, if we keep the dating analogy. It’s another kind of screening, but with a department head or CTO. At this stage it’s important to convey company values and product development strategy. Check the candidate again with follow-up questions about plans and values if you have doubts.  
  
I’ll leave the details of that process to managers themselves and move to the technical interview—the main stage in a developer interview.  
  
_“A great interview is work. It takes time to prepare, run the interview, and then wrap up effectively. If you don’t want to do that work, don’t take interviews,”_ continuing to quote Neil Roseman, it’s fair to agree this really is work—and whatever format you choose, you’ll have to dialogue with the candidate. Besides those who actually trained in hiring—_HR_—the technical interviewer should also level up _hiring_ skills.  
  

## 3\. Speak up for the poor _HR_ (why a good HR specialist matters)

  
In this article I’m writing from a winning position: a large company, a known brand—many specialists would agree to work here even without technical details. But in any company you can’t undervalue the HR specialist’s work. They’re a kind of filter at the company entrance. _“The employees you hire will be only as good as the hiring team you build,”_ Roseman confirms.  
  
People are any company’s main asset. A good recruiter, even without a brand in an unknown startup, can land specialists with an acceptable level of knowledge and do even more: find like-minded people who care about the product.  
  
_“A large company and a known brand can also complicate an HR specialist’s job by being on everyone’s lips. Solid knowledge of the project, development processes, and the team lets the recruiter decide at the first stage whether the candidate fits the role. As a result, up to 60% of candidates reach the technical interview,”_ says the head of recruiting at Mail.ru Group. But volumes are such that 60% isn’t six people.  
  
Potentially every specialist knows another specialist—that’s one more candidate source for a good recruiter. A referral program makes first contact friendlier and lighter thanks to the link between candidate and referrer, but after that everything still depends on the candidate’s professional skills.  
  
A good recruiter should always have a few aces up their sleeve if no suitable actively job-seeking candidate appears on the market. Recruiters regularly hunt “cold” candidates. _“As a rule, we offer people a neutral introduction to us, without an interview. Far from everyone agrees to a technical interview after that, and that’s normal. We build long-term relationships hoping that if not now, then in a year or two we’ll work together.”_  
  
Hiring is a complex process where the team the candidate would join can substantially help the recruiter, so you need to develop employer brand. You need atmosphere! A strong article on _Habr_, participation in relevant conferences raise the odds of hiring professionals. A thoughtful hiring system—where people come from, how and by what criteria we assess them, how we make the final decision—also helps the recruiter orient on the market and pin down company needs as precisely as possible.  
  
_“The main rule—stay human, and remember partnership with every candidate.”_  
  
![](/blog/habr/522326/img-01.png)  
  

## 4\. Play on the candidate’s field without forgetting yourself (requirements for interviewers)

  
Very different technical specialists come to us from different companies. Product companies pay more attention to user interfaces, [simple](https://ru.wikipedia.org/wiki/KISS_\(%D0%BF%D1%80%D0%B8%D0%BD%D1%86%D0%B8%D0%BF\)) and fast implementations, while software giants favor complex technical solutions, native code, and deep dives into operating system internals over the external layer and reaction to changing conditions. Candidates, depending on where they’ve worked, may specialize in certain technologies even if each is applying for the same nominal iOS developer role. Does that mean a specialist deep in parental controls on iPhone can never _switch_ to product storefronts, orders, and showing location on a map? How do you assess an applicant if their past experience mentions approaches that don’t ring a bell?  
  
The diversity of technologies, architectural patterns, and frameworks complicates candidate search, but you can and should speak a common language with candidates. A specialist with their head on their shoulders can adapt to new practices and even bring original solutions into established approaches. Lifting restrictions when searching—say on architectural patterns or programming languages, within one technology platform of course—will require the interviewer to know the relevant domains. Where do you get that knowledge? Experience running interviews will point the interviewer toward what to brush up on, which technologies and approaches are common on the market now, and how they differ from what the company uses. You don’t have to force yourself to become an expert. It’s enough to have a rough picture of the domain and dialogue with the candidate, letting them explain implementation details. That approach saves you from overspending on prep for a specific _interview_ and lets the candidate show flexible skills in explaining their view to another specialist.  
  
That doesn’t mean you shouldn’t prepare for the interview. Balance matters here. Offer the candidate to choose and explain a task and its solution using their favorite technology. Ask them to solve a typical problem from your domain but with their tools. Either way you can work on a problem together, learning both the candidate’s perspective and the technology they’re used to. Typical tasks for such a case interview are usually well illustrated by designing the architecture of a service, module, or screen. The candidate abstracts from concrete implementation, and you don’t need to dive into technical specifics. So open draw.io or any other site for block diagrams and charts, and go! This format works great on Zoom.  
  
Separately, candidates who can explain a solution are usually mature specialists, which is already a signal when assessing their abilities. This approach likely won’t work with _juniors_ and can turn awkward for both sides. So the interviewer should always be able to offer tasks of varying difficulty—or, more universally and elegantly—start with a simple scenario and gradually complicate it with new constraints.  
  
_“Use questions that are vague and open to discussion. See whether candidates ask follow-up questions to learn more,”_ Roseman advises, thereby setting up dialogue with the candidate and leaving room to maneuver if something goes wrong.  
  
The interviewer should ask technical questions and run the technical interview in a structured way. Neil Roseman warns: _“If you ran an interview and all you can say is: ‘Yeah, he seemed fine, I liked him,’ then you wasted your time.”_ A structured approach should become routine in preparing for and running interviews.  
  

## 5\. Script for the ideal technical interview

  
Of course, I won’t present a universal, perfect plan for running a technical interview here. It’s unique to each company and each interviewer. But I want to offer several ideas tested in real hiring practice at Delivery Club whose application [notably](https://habr.com/ru/company/mailru/blog/511812/) strengthened our team.  
  
**Remember the human side.** Help the interviewee relax; account for the stressful situation candidates are usually in. A good example is one of those conversations that happen in the company kitchen among _tech folks_ after some recent technology announcement or presentation. You can mention the latest news from the tech world or some widely felt developer pain.  
  
**Make a plan for the technical interview.** An interviewer plan with pre-planned questions of varying difficulty and knowledge-level ratings per topic makes it easier to wrap up well after the interview. A detailed result is always easier to compare with other results and to explain your decision on the candidate with reasons.  
  
Further use of such ratings, if you decide positively on the candidate, can show up in developing the employee’s competency matrix. In that way, a quality technical interview becomes the foundation for the specialist’s growth on your team.  
  
**Make the technical interview a dialogue between two specialists.** Start your dialogue by briefly listing the topics you plan to cover.  
  
**Try to use tasks on the interview that are as close as possible to real work.** If you ask an academic question and the candidate struggles, try framing a practical task that includes the answer to that question. For experienced interviewers—**send your questions to the candidate ahead of time**, and on the interview, assuming you and the candidate share the same baseline knowledge, discuss more practical and harder cases.  
  
**Offer the candidate a code review** instead of making them write new code. Code review practice fits the technical part of a situational interview well. Prepare suboptimal code or code with a bug in advance. And if the listing doesn’t contain secret information, it’s better to show the pull request that got the most comments from colleagues. That reframes “code on a napkin”: many candidates struggle writing code outside their preferred IDE or with someone watching. Code review in an _interview_ lets you verify reading and understanding code and assess teamwork from the tone and content of the candidate’s comments.  
  
**End the technical interview with a presentation of the project** the candidate would work on. It’s important not only to listen to the candidate but to answer their questions. You can’t always answer in maximum detail, but the candidate should understand at least in broad strokes what they’d be working on.  
  
In my practice, a presentation on product evolution originally prepared for a technical conference handled this well—it reflected both legacy and innovative approaches. Thanks to such a calling card, your project and team grow significantly in the candidate’s eyes.  
  
**Run the interview from start to finish.** _“Even if you understand 15 minutes in that the candidate isn’t a fit, it’s important to go through all the stages,”_ Neil Roseman says—_“You should try to run almost a full interview, because the world is very small, and it’s better the person thinks they just had a great interview even if they didn’t get an offer.”_  
  
Finding the right employee is hard work, and both sides can enjoy the process more if they get satisfaction from it. You’ll grow with every new _interview_, every new candidate, and in the end you’ll find the ideal one.  
  

## Script for the ideal technical interview. A drama in five acts

  
Next I’ll describe in a playful way the plan for one imaginary technical interview based on different real interviews. After each part I’ll give brief comments on what conclusions the interviewer can draw and how to continue the interview.  
  
Characters:  
  

*   Oleg—a young, promising iOS developer
*   Vasily—a seasoned iOS team tech lead

  

### Act one

  
![](/blog/habr/522326/img-02.png)  
  
_Neither character knows how the interview will go. Oleg might get lost in the code, jump between method names, vainly guessing where they’re called, or he might search for “1.5” and pinpoint where the delay is set without being able to explain how it works. Then Vasily will try to wrap this part quickly, thank him, and point out that such tasks are only assigned when the employee has the right Objective-C knowledge._  
  
_On the other hand, Oleg might logically reach the required method where the queue is set up, explain the queue parameters and how it works, and along the way talk about other queue types and ways to implement a similar task._  
  
_In both cases Vasily should watch the clock, not let thinking and discussion drag on, and try to score Oleg’s answer on a pre-prepared Objective-C rubric, and possibly multithreading too._  
  

### Act two

  
![](/blog/habr/522326/img-03.png)  
  
_How the interview develops depends on Oleg’s answer. But even if he can’t answer this question, the conversation won’t stop—Vasily will return to basic questions after answering the question posed to Oleg._  
  
_If Oleg has an insight after the hint, that means you can move to harder questions._  
  

### Act three

  
![](/blog/habr/522326/img-04.png)  
  
_Vasily already sees that Oleg can build user interfaces to match design requirements. It also seems Oleg is more inclined to act than to explain, which may shed light on why he struggles on some questions even though he knows how things work._  
  

### Act four

  
![](/blog/habr/522326/img-05.png)  
  
_Vasily is forming a fairly concrete picture of Oleg as a possible future teammate. Oleg knows the domain, follows requirements, but isn’t ready to give feedback or think more abstractly than the task may require._  
  
_To understand the last case, Vasily offers Oleg an architecture task._  
  

### Act five

  
![](/blog/habr/522326/img-06.png)  
  
_Designing the architecture of any system is always creative. It comes with dialogue and constant revisions. It’s unique and valuable in itself because it clearly shows whether the author understands what they’re explaining and whether they can explain it._  
  
_But the outcome of that process can also say something about the candidate. If Oleg had designed architecture as shown in one of the illustrations, Vasily would have formed a very different view of the candidate’s skills._  
  
![](/blog/habr/522326/img-07.jpeg)  
  
_What Oleg drew in the end we’ll skip, and leave it to the reader, based on the illustrations, to imagine whether Oleg understands the architecture he chose._  
  
![](/blog/habr/522326/img-08.png)  
  
That’s all. Thanks for reading to the end!
