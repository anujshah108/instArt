Configuration
===

To get the pp running you have one of two options:

first either run the server locally and change the link in line 100 in src/components/Main.js to be http://localhost:5000/image OR have the server be the heroku server(default)

```
return axios.get('http://localhost:5000/image').then(function(resp)
```
[the link to local server](https://github.com/anujshah108/rePostArtBackend)

THEN:

Make sure you have node, npm and XCode installed.

Make sure you have React Native command line tools installed:

```sh
npm install -g react-native-cli
```

*YOU WILL HAVE TO GET AWS S3 CREDENTIALS AND ADD THEM TO THE SECRETS.JSON IN src/components*

#Simulation


```sh
git clone https://github.com/anujshah108/rePostArt # or clone your own fork
cd rePostArt
npm install
Run Build for either OS
  * for iOS
    * run `react-native run-ios`
  * for Android
    * Run Genymotion
    * run `react-native run-android`
```

#Build on iPhone

The other option is to install on iPhone directly through USB and XCode.

Go into XCode by clicking the rePostArt.xcodeproject in the ios folder of the repo.

Make sure you have a Personal Team and App Developer Account (Free is Okay).

iPHONE is Unlocked and then plug in.

Set a personal team for all four targets in XCode.

Then allow the app to build and once that is done select your phone in the upper right hand corner.

Then press the build or play button.

It should build to your phone and make sure iphone is unlocked.

