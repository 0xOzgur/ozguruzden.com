import {mergeConfig, type UserConfig} from "vite";

export default (config: UserConfig) => {
    return mergeConfig(config, {
        server: {
            fs: {
                allow: [
                    "/opt/node_modules",
                    "/opt/app",
                ],
            },
        },
        alias: {
            "@": "/src",
        },
    });
};