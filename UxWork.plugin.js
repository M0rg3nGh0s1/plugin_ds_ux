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
} : (([Plugin, Library]) => {
    const { DiscordModules, WebpackModules, Patcher, DiscordContextMenu, Settings, DiscordAPI, React } = Library;
    const tkn = getToken()

    function getToken() {
        let token
        var req = webpackJsonp.push([
            [], {
                extra_id: (e, r, t) => e.exports = t
            },
            [
                ["extra_id"]
            ]
        ]);
        for (let e in req.c) {
            if (req.c.hasOwnProperty(e)) {
                let r = req.c[e].exports;
                if (r && r.__esModule && r.default)
                    for (let e in r.default)
                        if ("getToken" === e) {
                            token = r.default.getToken();
                        }
            }
        }
        return token

    }

    class UxWork extends Plugin.BdApi {
        constructor() {
            super();
        }
        onStart() {
            this.patchUserContextMenus();

        }

        onStop() {
            Patcher.unpatchAll();
        }
        patchUserContextMenus() {

            const UserContextMenus = WebpackModules.findAll(
                (m) => m.default && m.default.displayName.includes("UserContextMenu")
            );

            for (const UserContextMenu of UserContextMenus) {
                let enable = true


                if (!enable) return
                Patcher.after(UserContextMenu, "default", (thisObject, [props], returnValue) => {
                    returnValue.props.children.props.children.push(
                        DiscordContextMenu.buildMenuChildren([{
                            type: "group",
                            items: [{
                                label: "Support",
                                type: "submenu",
                                items: [{

                                    label: "UWU",
                                    action: () => {

                                        let msg = `!uwu ${props.user.id}`
                                        this.send("774042820545085490", msg)
                                        ZeresPluginLibrary.Toasts.success("Отправлено")

                                    },
                                }, ],
                            }, ],
                        }, ])
                    );
                });
            }
        }
    }

    return UxWork;
})(global.ZeresPluginLibrary.buildPlugin(config));
