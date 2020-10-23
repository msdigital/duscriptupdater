/***

TODO:
- check to only download lua scripts

******/
var fs = require('fs')
  , os = require('os')
  , path = require('path')
  , https = require('https')
  , async = require('async')
  , inquirer = require('inquirer')

const scriptsFile = '../lua_scripts.conf';
const configFile = '../config.json';

var questions = [{
  type: 'input',
  name: 'gamePath',
  message: "Please enter path to Game (C:\\Program Data\\Games\\Dual Universe\\)\n> ",
}]

var closeRequest = function(uri, output){
  return new https.get(uri, (res) => {
    if(res.statusCode === 200){
      res.pipe(output)
    }
  })
}

var downloadScripts = function(cb){
  const config = require(configFile)

  fs.readFile(scriptsFile, function(err,data){
    if(err) throw err;

    var array = data.toString().split("\n");
    var counter = 0

    for (i in array){
      var file = null
      var scriptUri = array[i];
      counter++;

      scriptName = path.basename(scriptUri);
      var fullpath = config.gamePath + "Game\\data\\lua\\autoconf\\custom\\" + scriptName;
      var req = closeRequest(scriptUri, fs.createWriteStream(fullpath));
      console.log('\x1b[32m%s\x1b[0m',scriptName + ' updated');

      if(counter==array.length){
        cb(null)
      }
    }
  });
}

var askForConfig = function(cb){
  // console.log('ask for config')
  inquirer.prompt(questions).then(answers => {
    var confStream = fs.createWriteStream(configFile);
    var gamePath = answers['gamePath'];

    if(gamePath.slice(-1) != "\\"){
      gamePath = gamePath + "\\";
    }

    var config = {
      "gamePath": gamePath,
    };

    fs.writeFile(configFile, JSON.stringify(config, null, 4), 'utf8', (err) => {
      if (err) {
          cb(err, null)
      } else {
          startApp()
      }
    });
  });
}

var startApp = function(){
  async.waterfall([
      function(cb){
        if(!fs.existsSync(configFile)){
          askForConfig(cb)
        }
        else {
          cb()
        }
      },
      function(cb){
        // console.log('is config ok?')
        var cf = JSON.parse(fs.readFileSync(configFile))

        // console.log(cf)
        // console.log(cf.gamePath.length)
        if(cf.gamePath.length < 10){
          console.log('\x1b[41m%s\x1b[0m',"============================================")
          console.log('\x1b[41m%s\x1b[0m','Your Game Path seems wrong! Please enter again!')
          console.log('\x1b[41m%s\x1b[0m',"============================================")
          askForConfig(cb)
        }
        else {
          // console.log('path OK')
          cb(null)
        }
      },
      function(cb){
        if(!fs.existsSync(scriptsFile)){
          fs.writeFileSync(scriptsFile, '', 'utf-8');
          console.log('\x1b[41m%s\x1b[0m',"============================================")
          console.log('\x1b[31m%s\x1b[0m',"Couldn't find any lua script download links!")
          console.log('\x1b[32m%s\x1b[0m',"Please add URIs to lua_scripts.conf")
          console.log('\x1b[41m%s\x1b[0m',"============================================")
          return
        }
        else {
          cb(null)
        }
      },
      function(cb){
        if(fs.statSync(scriptsFile)["size"]<10){
          console.log('\x1b[41m%s\x1b[0m',"============================================")
          console.log('\x1b[31m%s\x1b[0m',"Couldn't find any lua script download links!")
          console.log('\x1b[32m%s\x1b[0m',"Please add URIs to lua_scripts.conf")
          console.log('\x1b[41m%s\x1b[0m',"============================================")
          return
        }
        else {
          cb(null)
        }
      },
      function(cb){
        downloadScripts(cb);
      }
    ],
    function(err){
      if(err){
        console.log(`ERROR: ${err}`);
      }
    }
  )
}

startApp();