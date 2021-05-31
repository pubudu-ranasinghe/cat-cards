# Cat Cards 😸

A simple app generating cat greeting cards using images of cats from _Cat as a Service_ (https://cataas.com)

## Usage

A recent version of nodejs is recommended as the code uses modern JS syntax without depending on transpiling.

```sh
npm install
npm start
```

### Command Options

The following arguments can be passed to `npm start` command. Please note you need to separate commands send to program using `--`

```sh
# Eg
# npm run <command> [-- <args>]
npm start -- --output card.jpg
```

```
--greeting  The greeting text
--who       Receiver name
--width     Width of one side of card (Note that final image will be two times this width)
--height    Height of card
--color     Text color (Eg: red)
--size      Text size (1-100)
```

## Explaination

### Use `jimp` instead of `@mapbox/blend`

The blend package has not been maintained for several years, has issues compiling on windows (binaries provided by mapbox are no longer available) and uses older callback syntax. Due to these reasons I decided switch to `jimp` which is a well maintained and popular library for image handling in javascript. It provides several conveniece methods which make the code simpler.

### Use `axios` instead of `request`

Although `request` is still very popular and is a solid choice for node http request handling, it has gone in to maintenance mode for sometime now (Refer: https://github.com/request/request/issues/3142)

Considering the maintenance and future updates I have switched to `axios` which is also an excellent http library.

### Switch to `async/await` syntax and other new JS features

Callback style code was updated to use `async/await` along with some more features such as object destructuring, template literals etc.

### Use of bundlers/transpilers

Although in a real world project we may opt to use a bundler and a transpiler, I decided to keep this project simple since modern node versions support the used JS features.

### Code formatting/linting

Again to keep things simple I have not added linting but added `prettier` to keep the code nice and tidy.

### Fixed text color bug

The request send to cat API was missing a `=` sign in original code which made the text color not work, and has been fixed.


