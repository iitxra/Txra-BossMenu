Config = {}

Config.Jobs = {
    ["police"] = {
        BossGrade = 4,
        MenuCoords = vector3(389.34, -977.0, 29.43),
        Label = "Police Department",
        Wings = {
            {name = "SWAT", icon = "shield"},
            {name = "PILOTS", icon = "helicopter"},
            {name = "BIKE", icon = "motorcycle"},
            {name = "K9", icon = "dog"},
            {name = "INTERCEPTOR", icon = "car"}
        },
        DashboardUnits = {
            {name = "SWAT", label = "SWAT"},
            {name = "PILOTS", label = "PILOTS"},
            {name = "BIKE", label = "BIKE"}
        }
    },
    ["ambulance"] = {
        BossGrade = 4,
        MenuCoords = vector3(391.64, -969.97, 29.44),
        Label = "Medical Department",
        Wings = {
            {name = "SURGERY", icon = "medical"},
            {name = "ICU", icon = "heart"},
            {name = "TRAUMA", icon = "ambulance"},
            {name = "PILOTS", icon = "helicopter"}
        },
        DashboardUnits = {
            {name = "SURGERY", label = "SURGERY"},
            {name = "ICU", label = "ICU"},
            {name = "TRAUMA", label = "TRAUMA"}
        }
    }
}

Config.InteractDistance = 4.0
Config.InteractRadius = 1.0

Config.UseItem = false
Config.ItemName = "boss_tablet"

Config.Sounds = {
    Enable = true,
    ClickFrequency = 400,
    ClickVolume = 0.02,
    HoverFrequency = 600,
    HoverVolume = 0.01
}

Config.WingsIcons = {
    ['SWAT'] = '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>',
    ['PILOTS'] = '<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></path>',
    ['BIKE'] = '<circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6a2 2 0 1 0-4 0l-4.5 9.5H9"/>',
    ['K9'] = '<path d="M12 2c.5 0 .5.5.5.5s.5.5.5 1-.5 1.5-1 1.5S11 4.5 11 4s.5-2 1-2zM6 7c.5 0 .5.5.5.5s.5.5.5 1-.5 1.5-1 1.5S5 9.5 5 9s.5-2 1-2zm12 0c.5 0 .5.5.5.5s.5.5.5 1-.5 1.5-1 1.5-1-.5-1-1 .5-2 1-2zM9 12c.5 0 .5.5.5.5s.5.5.5 1-.5 1.5-1 1.5-1-.5-1-1 .5-2 1-2zm6 0c.5 0 .5.5.5.5s.5.5.5 1-.5 1.5-1 1.5-1-.5-1-1 .5-2 1-2z"/>',
    ['INTERCEPTOR'] = '<rect x="1" y="5" width="22" height="14" rx="3"/><line x1="4" y1="15" x2="6" y2="15"/>',
    ['SURGERY'] = '<path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/><path d="M12 6v6l4 2"/>',
    ['ICU'] = '<path d="M20 8h-3V5a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2z"/><line x1="12" y1="13" x2="12" y2="17"/><line x1="10" y1="15" x2="14" y2="15"/>',
    ['TRAUMA'] = '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>'
}