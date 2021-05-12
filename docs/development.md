For development, the following frameworks are used:

- node and npm
- [Vite 2](https://vitejs.dev/)


# Installing:

To install, use `npm ci` instead of `npm install`, in order to do a "deterministic install" (this installs the dependency tree in *package-lock.json* and ensures that you are running with the same dependencies) [more on this](https://stackoverflow.com/questions/44206782/do-i-commit-the-package-lock-json-file-created-by-npm-5).
```
npm ci
```

## Running dev server:
```
npm run dev
```

## Building:
```
npm run build
```


# Installing npm and nodejs

- [Installing node and npm](https://linuxize.com/post/how-to-install-node-js-on-ubuntu-20-04/) using apt-get (Ie on Ubuntu or MX Linux)


Example
```
sudo apt-get install nodejs npm
```
