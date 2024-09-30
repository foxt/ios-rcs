import { readFileSync, writeFileSync } from "fs";
import { transform } from "lightningcss";
import { Fragment, h } from "preact";
import renderToString from "preact-render-to-string";
import { getCountryFlag } from "./countries.ts";
import processed from "./processed.json";
import type { CarrierPlist } from "./types/carrier.plist";

let carriers = processed as Record<string, { source: string, version: string, names: string[], country?: string, countryCode: string, data: CarrierPlist }>;

const CarrierSupportTable = () => { 
    let sorted = Object.entries(carriers).filter(([_, {version}]) => {
        let [major] = version.split('.').map(Number);
        return major > 49;
    }).sort(([aId, aData], [bId, bData]) => {
        let aCountry = aData.country ?? aData.countryCode ?? "ZZ";
        let bCountry = bData.country ?? bData.countryCode ?? "ZZ";
        let countryCompare = aCountry.localeCompare(bCountry);
        if (countryCompare !== 0) return countryCompare;
        if (aData.data.RCS && !bData.data.RCS) return -1;
        if (!aData.data.RCS && bData.data.RCS) return 1;

        let aName = aData.names[0] || aId;
        let bName = bData.names[0] || bId;
        return aName.localeCompare(bName);
    });
    let grouped = Object.groupBy(sorted, ([id, data]) => (getCountryFlag(data.countryCode || "") || "🌐") + " " + (data.country || "Worldwide"));
    let entries = Object.entries(grouped);
    entries.sort(([aCountry,aCarriers],[bCountry,bCarriers]) => 
        (bCarriers?.filter(([id, data]) => data.data.RCS).length ?? 0) -
        (aCarriers?.filter(([id, data]) => data.data.RCS).length ?? 0) 
    );

    return <div class='countries'>{entries.map(([country, carriers]) => (country !== "🌐 Worldwide" && <>
        <h2>{country}</h2>
        <div class='carriers'>
            {carriers?.map(([id, data]) => <div class='carrier' data-supports={!!data.data.RCS}>
                <div class='header'>
                    <h3>{data.names[0]}</h3>
                    <span class='emoji'>{data.data.RCS ? '✅' : '❌'}</span>
                </div>
                {data.names.length > 1 && <p class='aka'>aka. {data.names.slice(1).join(", ")}</p>}
                <div class='grow'></div>
                <p class='id'>{id} {data.version}</p>
            </div>)}
        </div>
    </>))}</div>

}
import { Fragment, h } from "preact";
let html = renderToString(<>
    <head>
        <title>Does My Carrier Support RCS on iOS Yet?</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="A list of carriers that support RCS on iOS" />
        <style dangerouslySetInnerHTML={{__html: transform({
                filename: "index.css",
                code: readFileSync("./html/index.css"),
                minify: true,
                sourceMap: false,
                targets: {
                    chrome: (120 << 16),
                    firefox: (120 << 16),
                    safari: (14 << 16),
                }
            }).code.toString() }} />
    </head>
    <body>
        <div class='container'>
            <header>
                <h1>Does My Carrier Support RCS on iOS Yet?</h1>
                <p>
                    <a href="https://support.apple.com/en-us/109526" target="_blank">Apple provided</a> a list of what features each carrier supports... but only listed RCS support for US/CA carriers. <b>This is a list of all of them.</b>
                </p>
            </header>
            <CarrierSupportTable />
        </div>
    </body>
</>);
writeFileSync("./html/index.html", html);