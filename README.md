# Stars

Create an effect similar to the lightspeed screensaver on Windows.

## Building

Building requires the [google closure compiler](https://github.com/google/closure-compiler).
It can be installed manually by following the instructions in this link, or
if you are on macOS, by running `brew install closure-compiler`.

Once that's installed, just run `./compile.sh`. This will produce a bundle.js
and a bundle.js.map file.

## Running

Just open the __index.html__ file in a browser. Seriously, you don't even need a server.
Alternatively, if you absolutely love having a server, run the `./run.sh` script to start up
a simple http server and hit [localhost:8000](http://localhost:8000).

## History

I started this project in 2015 as a way to learn the html5 canvas. I'm only now
getting around to adding it to github, and that's partially why the commit
history is so spotty.

Recently I wanted to start converting my old projects over to es2015 syntax
to practice modularizing javascript code. In doing so I am also trying to get better
at tracking my progress through smaller, more incremental commits.
