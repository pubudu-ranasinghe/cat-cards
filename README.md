# Cat Cards 😸

A simple app generating cat greeting cards using images of cats from _Cat as a Service_ (https://cataas.com) 

## Usage

A fairly recent version of nodejs is recommended as the code uses some modern JS syntax without depending on transpiling.


```
npm install
npm start
```

### Command Options

The following arguments can be passed to `npm start` command

```
--greeting  The greeting text
--who       Receiver name
--width     Width of one side of card (Note that final image will be two times this width)
--height    Height of card
--color     Text color (Eg: red)
--size      Text size (1-100)
```