# Dual Universe LUA Updater

Small Tool to update LUA Scripts automatically.

### Prerequisites

Dual Universe ;)

### Installing

Standalone NodeJS Project, so no Installation needed.

### Run the Updater

1. Add URIs (only URIs directyl to files are working right now) to the `lua_scripts.conf` File
2. Doubleclick `StartAPP.bat` to start the Updater
3. With the first Start, the app will ask you for the Game Directory (eg. C:\Dual Universe\)
4. Wait until the Script downloaded all LUA Scripts.
5. Enjoy!

> NOTE: There are already two usefull Scripts inside the `lua_scripts.conf` to show you how it should look like.

## Troubleshooting

If you're getting one of these Messages, please do the following:

`Your Game Path seems wrong! Please enter again!`
Delete the `config.json` File and start the App. It will ask you again for the Game Directory.

`Couldn't find any lua script download links!`
Add Links to the `lua_scripts.conf` File.

`ERROR: whatever-the-error-is`
Looks like something unexpected happened, don't bother to open an issue and i'll take a look into it.

## Authors

* **msdigital.ch** - *Initial work* - [msdigital](https://gitlab.com/msuti)

## Credit
For example purpose, there are already links to two Scripts inside the `lua_scripts.conf`

* ButtonsHud - Dimencia and Archaegeo - https://github.com/Dimencia/DU-Orbital-Hud
* DU-FuelScreen - https://github.com/RostCS/DU-FuelScreen

## License

This project is licensed under GNU Lesser General Public License version 3 (GNU LGPLv3) - see the [LICENSE.md](LICENSE.md) file for details