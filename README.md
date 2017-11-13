Hue Clapper
===

## Getting Started

### Install JavaScript dependencies
`npm install`
`yarn`

### [Sox](http://sox.sourceforge.net/) is required
`brew install sox`
`sudo apt-get install sox`

### Config
Your Phillips Hue bridge should be on your local network. Add it's IP address
to `config.json`, as well as the username.

To obtain your username, follow the instructions on the Philips Hue API getting
started guide.

The `threshold` and `audioSource` options in the config file can be tweaked
based on your setup. These values are for Sox. Note that this has only been
tested on mac OS. These values seem to work fine.

### Usage
Run `npm start` to begin the program. Clap to turn on and off the lights.
