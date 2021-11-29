/**
 * @name UxWork
 * @displayName UxWork
 * @source https://github.com/M0rg3nGh0s1/plugin_ds_ux/blob/main/UxWork.plugin.js
 * @authorId 272771516872261632
 * @author MG 
 * @invite f4ZBRvb7wj
 * @authorLink https://www.instagram.com/m0rg3ngh0s1.0_0/
 */

const config = {
    info: {
        name: "UxWork",
        authors: [{
            name: "MG",
            discord_id: "272771516872261632",
        }],
        version: "0.0.1",
        description: "Визуальный интерфейс для работы на ролях",
        github: "https://github.com/M0rg3nGh0s1/plugin_ds_ux/blob/main/UxWork.plugin.js",
        github_raw: "https://raw.githubusercontent.com/M0rg3nGh0s1/plugin_ds_ux/main/UxWork.plugin.js",

    },
    changelog: [{
        title: "Plugin",
        type: "fixed",
        items: [
            "Теперь работает"
        ]
    }],
    defaultConfig: []
};

// Подгрузка
module.exports = !global.ZeresPluginLibrary ? class {
    constructor() {
        this._config = config;
    }

    getName() {
        return config.info.name;
    }

    getAuthor() {
        return config.info.authors.map(author => author.name).join(", ");
    }

    getDescription() {
        return config.info.description;
    }

    getVersion() {
        return config.info.version;
    }

    load() {
        BdApi.showConfirmationModal("Library plugin is needed",
            `The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`, {
                confirmText: "Download",
                cancelText: "Cancel",
                onConfirm: () => {
                    request.get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", (error, response, body) => {
                        if (error) {
                            return electron.shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");
                        }

                        fs.writeFileSync(path.join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body);
                    });
                }
            });
    }

    start();

    stop();
} : (([Plugin, Library]) => {})(global.ZeresPluginLibrary.buildPlugin(config));
