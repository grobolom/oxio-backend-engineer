# OXIO backend engineering test

## Installation

This test app can be used in two ways: via Docker or via local yarn.

### Yarn

```bash
yarn
yarn server
```

This will run a server on port 3000, that you can then send requests to
via Postman (or other similar tools).

### Docker

```bash
docker build . -t oxio
docker run -p 8080:3000 -t oxio
```

This will run a server on port 8080, that you can then send requests to
via Postman (or similar tools).

## Choice of Tools

This application uses Docker, Node, Express, and Jest as its primary tooling.
Docker and Node are chosen for ease of install and portability - Yarn and
Docker are available across pretty much all platforms, and have a huge
community. This helps with troubleshooting and onboarding. Express was chosen
for simplicity - there are other frameworks that provide additional features
(e.g. Koa), but for a simple app, Express handles everything that is needed.
Jest was chosen as it is one of the simplest out-of-the-box testing experiences
in Node. It has a ton of documentation as well, which makes onboarding simple.

## Deployment

This app, as-is, could be deployed to AWS's Elastic Beanstalk without
modification. However, for more complex setups (such as something bespoke
on EC2 or something that necessitates Kubernetes), changes would need to be
made to the Dockerfile. A natural extension here would be to create a
`docker-compose.yml` file for local development, as well as a properly
production-ified Dockerfile.

## Assumptions

There are many assumptions made about the problem:

1. As detailed in the code, there is no standard for 'area codes' that I
    could find across the internet. As it stands, all 'area codes' end up being
    3 digits long, but this is immediately incorrect for the UK (which technically
    has only 2-digit area codes).
2. A phone number can be 'valid' but may not actually be a real phone number.
    Using a tool like google's `libphonenumber` or Twilio's Lookup API would
    ameliorate this issue, but would slow down the API calls (or incur a monetary
    cost).
3. A phone number may look 'valid' but may not be. For example, US phone numbers
    must consist of 10+1 digits. Thus, a phone number like `+120187366661234` is
    technically valid under E.164, but is not actually valid in the US (only the
    `+12018736666` portion is a 'real' number).
4. There are some assumptions made about the exact output format required, such
    as intentionally adding a '+' to the phone # in the output format if it is
    not requested. These are pretty minor, and can be adjusted as needed.

## Improvements

There are many, many improvements that can be made here. I will list some, but
it is likely that a thorough review can dig up even more.

1. Adding a `docker-compose.yml` file would likely speed up local development
    if this were part of a real production app.
2. Adding a command to watch the tests, rather than just run them, would speed
    up the developer experience when doing TDD.
3. Adding an OpenAPI spec would improve experience from the consumer-side of the
    API, as well as make the expected inputs and responses clear.
4. The `routes.js` file contains code that I would push down into a 'service'
    layer - I think that anything aside from input processing and response
    processing shouldn't live in routing files.
5. The overall structure could improve - adding `index.js` files that contain
    only what should be exported out of each module would help significantly with
    discovery and usability. Adding a `README` file to the `countries` module to
    make it clear why and how it exists would also help.
6. The naming in the `countries` module could improve. The file naming doesn't
    give enough of a hint as to what files are more 'static' (the generated
    JSON vs. the `countries.js` files) / filled with constants, vs. those files
    that export functions that are meant to be the public API of the module.
7. The `exportPhoneNumber` file should likely only contain that specific function,
    and should import `findMatchingCountryCode` from elsewhere. In addition,
    the latter function should be tested.
8. The `exportPhoneNumber` function is too complex. It can be simplified, and
    sections of it could be consolidated into their own functions, that can be
    more easily tested on their own if needed. In addition, there is a lot of
    regex manipulation that can likely be simplified into fewer calls.
9. A library like `libphonenumber` would be a better choice - it works out
    of the box and is a more robust and correct version of what I've coded here.
10. The Errors should be consolidated into an `errors.js` file, and their string
    values extracted. This way, we can make sure that we aren't doing string
    comparison for these errors, and external consumers and developers can more
    quickly understand the types of errors that can be expected.
11. Everything should be JSDoc'ed.
12. Typescript? Probably unnecessary for this kind of endeavour, but even making
    sure that some of the values coming back from Regexes / undefined values
    that occasionally leak through here (or at least I noticed them doing so
    during development) would be avoided.

This is just what I could think of from a cursory review, but there may be
more.
