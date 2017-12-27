requestUrl = "http://192.168.43.95:3000/";

y, m, d, h, i, s, timezone = string.match(devices.system.EnergyStart, "(%d+)-(%d+)-(%d+)%s(%d+):(%d+):(%d+)%s(%u+)")
queryString = "?EnergyStart=" .. y .. "_" .. m .. "_" .. d .. "_" .. h .. "_" .. i .. "_" .. s .. "_" .. timezone;
queryString = queryString .. "&os_timestamp=" .. os.time();
queryString = queryString .. "&os_date=" .. os.date("%Y_%m_%d_%H_%M_%S_%Z");

outputFields = { "consumption", "cumulatedConsumption", "current", "powerFactor", "state" };

for i = 1,4 do
    for k, outputField in pairs(outputFields) do
        deviceVariableName = "output" .. i .. "_" .. outputField;
        queryString = queryString .. "&" .. deviceVariableName .. "=" .. devices.system[deviceVariableName]
    end
end

devices.system.CustomCGI{url = requestUrl .. queryString};
