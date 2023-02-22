module.exports = {
    apps: [
        {
            name: 'AdminSebTj',
            port: 3001,
            exec_mode: 'cluster',
            instances: '1',
            script: './.output/server/index.mjs',
            args: 'preview',
        },
    ],
}