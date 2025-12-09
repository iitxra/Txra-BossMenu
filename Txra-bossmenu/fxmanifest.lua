fx_version 'cerulean'
game 'gta5'

author 'Txra Development'
description 'Txra Boss Menu'
version '1.0.0'

lua54 'yes'

shared_scripts {
    '@qb-core/shared/locale.lua',
    'config.lua'
}

client_scripts {
    'main/client.lua'
}

server_scripts {
    '@oxmysql/lib/MySQL.lua',
    'server/server.lua'
}

ui_page 'TxraUi/index.html'

files {
    'TxraUi/index.html',
    'TxraUi/style.css',
    'TxraUi/script.js'
}

dependencies {
    'qb-core',
    'oxmysql'
}