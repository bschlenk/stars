# Stars

[![Greenkeeper badge](https://badges.greenkeeper.io/bschlenk/stars.svg)](https://greenkeeper.io/)

Create an effect similar to the [*flying through space*](https://youtu.be/SiSXDEIu3GI?t=2s) screensaver on Windows.

## Building

Building requires the [Closure Compiler](https://github.com/google/closure-compiler).
It can be installed manually by following the instructions in this link, or
if you are on macOS, by running `brew install closure-compiler`.

Once that's installed, just run `./compile.sh`. This will produce a bundle.js
and a bundle.js.map file.

## Running

Just open the __index.html__ file in a browser. Seriously, you don't even need a server.
Alternatively, if you absolutely love having a server, run the `./run.sh` script to start up
a simple http server and hit [localhost:8000](http://localhost:8000).

## History

Recently I wanted to start converting my old projects over to es2015 syntax
to practice modularizing javascript code. In doing so I am also trying to get better
at tracking my progress through smaller, more incremental commits.

I started this project in 2015 as a way to learn the html5 canvas. I was not very good at
commiting at that point, hence the very sparse history. In reviving this project I am also
trying to *commit* to commiting more frequently. Commits are essentially free after all,
and can be rebased whenever necessary.

I'm only now adding this project to github, and I hope that I am able to gain something
from this experience.
