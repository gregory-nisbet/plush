FROM fedora:22

RUN dnf -y update
RUN dnf -y install git haskell-platform

RUN cd ~ && git clone https://github.com/mzero/plush plush
RUN cd ~/plush && cabal update
RUN cd ~/plush && cabal install --only-dependencies
RUN cd ~/plush && cabal configure
RUN cd ~/plush && cabal build
