export interface iTunesUpdate {

    MobileDeviceProductTypes:                   MobileDeviceProductTypes;
    MobileDeviceReverseDFUProductTypeIDs:       MobileDeviceReverseDFUProductTypeIDs;
    MobileDeviceMajorVersions:                  Record<`${number}`, number | number[]>;
    MobileDeviceMajorVersionsByProductType:     Record<iOSDeviceIdentifier, { SameAs: iOSDeviceIdentifier } | Record<`${number}`, number | number[]>>;
    MobileDeviceSoftwareVersions:               iOSRestoreSoftwareVersions;
    MobileDeviceSoftwareVersionsByVersion:      Record<`${number}`, MobileDeviceSoftwareVersionsByVersion>;
    
    MobileDeviceCarriers:                       Record<`${number}`,string>;
    MobileDeviceCarrierBundles:                 Record<string, CarrierBundleSimple>;
    MobileDeviceCarriersByMccMnc:               MobileDeviceCarriersByMccMnc;
    MobileDeviceCarriersByCarrierID:            Record<string,string>;
    MobileDeviceCarrierBundlesByProductVersion: MobileDeviceCarrierBundlesByProductVersion;
    CarrierBundles:                             CarrierBundles;
    CarrierBundleSignatures:                    CarrierBundleSignatures;
    CountryBundles:                             CountryBundles;
    CountryBundleSignatures:                    CarrierBundleSignatures;
    

    iBooksDictionaries:                         Record<"en" | "ja", iBooksDictionary>;

    NikeVoiceKits:                              NikeVoiceKits;
    NikeVoiceKitsByVersion:                     Record<"2", NikeVoiceKits>;

    iPodVoiceOverKit:                           IPodVoiceOverKit;

    ConfiguratorVersions:                       Record<string, ConfiguratorVersion>;

    iPodSoftwareVersions:                       Record<`${number}`, FirmwareAsset>;
    iPodWindowsUpdaterVersions:                 Record<`${number}`, iPodUpdaterVersion>;
    iPodMacUpdaterVersions:                     Record<`${number}`, iPodUpdaterVersion>;
    iPodSupport:                                IPodSupport;
    iPodSupportV2:                              IPodSupport;


    iTunesWindowsVersion:                       string;
    iTunesWindows10Version:                     string;
    iTunesWindows7AndLaterVersion:              string;
    iTunesWindowsXPPreSP2Version:               string;
    iTunesWindows2KVersion:                     string;
    iTunesWindowsASUMinimumVersion:             string;
    iTunesWindowsDoNotUseASU:                   string;
    iTunesWindowsDownloadURL:                   string;
    iTunesMacVersion:                           string;
    iTunesRequiredMacOSVersions: {
        MacOSVersion:  string[];
        iTunesVersion: string[];
    };
}




interface OSVersionRange {
    Min?: string;
    Max?: string;
}    

interface FirmwareAsset {
    DocumentationURL?: string;
    FirmwareURL:       string;
    ProductVersion?:   string;
    BuildVersion:      string;
    FirmwareSHA1?:     string;
    EpochVersion?:     string;
    IsPersonalizable?: boolean;
    UpdaterFamilyID?:  number;
    BuildID?:          number;
    VisibleBuildID?:   number;
}



interface CarrierBundleSignatures {
    Format1: { signature3: string; };
    Format2?: { signature3: string; };
}



type BundleMappingVersioned = Record<`${number}`, {
    OS:               OSVersionRange;
    BundleMatchEntry: string;
}>;


interface MVNO {
    BundleMapKey?: string;
    BundleMap?: string;
    BundleName?: string;
    GID1?: string;
    GID2?: string;
    ICCID?: string;
    IntegratedCircuitCardIdentity?: string;
}

interface WatchImsiValue {
    BundleMapKey?: string;
    MVNOs?: MVNO[];
}







type CountryBundles = Record<"Watch" | "iPhone", {
    BundleMappings: Record<`${string}_Map`, BundleMappingVersioned>;
    Bundles:        Record<`${string}_${number}`, CarrierBundle>;
    CountryId:      Record<`${number}` | `com.apple.${string}`, WatchImsiValue>;
}>;


interface CarrierBundle {
    Digest:        string;
    BundleURL:     string;
    BundleVersion: string;
    BundleID:      string;
    OS?:           OSVersionRange;
}


interface CarrierBundles {
    Watch: {
        BundleMappings: Record<`${string}_Map`, BundleMappingVersioned>;
        Bundles:        Record<`${string}_${string}_${number}`, CarrierBundle> & { signature: string };
        IMSI:           Record<`${number}`, WatchImsiValue>;
    };
    iPhone: {
        OtherKnownSettings: Record<`${number}`, CarrierBundle>;
    };
}



interface CarrierBundleSimple {
    BundleURL:    string;
    BuildVersion: string;
    Digest?:      string;
    Digest3?:     string;
}

type iOSVersion = `${number}.${number}`
type CarrierBundlesByVersion = Record<iOSVersion, CarrierBundleSimple>;
type MobileDeviceCarrierBundlesByProductVersion = CarrierBundlesByVersion & {
    ByProductType: CarrierBundlesByProductType;
}

type CarrierBundlesByProductType = {
    iPhone?:      { FallbackToByProductVersion: boolean; };
    iPad?:        CarrierBundlesByVersion;
} & Record<iOSDeviceIdentifier, CarrierBundlesByVersion>;


type MobileDeviceCarriersByMccMnc = Record<`${number}` | `bs-${number}`, {
    BundleName?: string;
    MVNOs?: MVNO[];
}>;



interface MobileDeviceProductTypes {
    DFU:      Record<`${number}`, iOSDeviceIdentifier>;
    Recovery: Record<`${number}`, iOSDeviceIdentifier>;
}


interface MobileDeviceReverseDFUProductTypeIDs {
    DFU:      Record<`${number}`, number | `${number}`>;
    Recovery: Record<`${number}`, number | `${number}`>;
}

interface DFUVersions {
    DFU: Record<`${number}`, FirmwareAsset>;
}

interface MobileDeviceSoftwareVersionsByVersion {
    RecoverySoftwareVersions: {
        WTF: Record<`${number}`, FirmwareAsset | Record<`${number}`, FirmwareAsset>>;
        Recovery?: DFUVersions;
        Firmware?: DFUVersions;
    };
    MobileDeviceSoftwareVersions: Record<iOSDeviceIdentifier,Record<iOSBuildCode, MobileDeviceSoftwareVersion>>;
    RequiredITunesVersion?:       string;
}

type MobileDeviceSoftwareVersions = Record<`${number}`, MobileDeviceSoftwareVersion> | MobileDeviceSoftwareVersion;
interface MobileDeviceSoftwareVersion {
    Restore?:                              FirmwareAsset;
    OfferPartialRestoreAsUpdate?:          boolean;
    Universal?:                            MobileDeviceSoftwareVersion;
    SameAs?:                               iOSDeviceIdentifier;
    OfferRestoreAsUpdate?:                 boolean;
    Update?:                               FirmwareAsset;
    OfferPurchasedPartialRestoreAsUpdate?: boolean;
    PurchasedRestore?:                     FirmwareAsset;
    OfferPurchasedRestoreAsUpdate?:        boolean;
}


type PartialRecord<K extends keyof any, T> = {
    [P in K]?: T;
}



// Example iOS device types for intellisense
type iOSDeviceIdentifier = (string & {}) | 
    "AppleTV5,3" | // Apple TV HD (4th generation)
    "AudioAccessory5,1" | // HomePod mini
    "iPad7,5" | // iPad (6th generation)
    "iPhone11,6" | // iPhone XS Max
    "iPod5,1"; // iPod Touch (5th generation)

type iOSBuildCode = (string & {}) |  "16A366 (example)" | "Unknown";


type iOSSoftwareVersionsRestore = Record<iOSBuildCode, {
    Restore: FirmwareAsset;
    OfferPartialRestoreAsUpdate?: boolean;
}>;
type iOSRestoreSoftwareVersions = Record<iOSDeviceIdentifier, iOSSoftwareVersionsRestore>


type NikeVoiceKits = Record<"zh" | "de-DE" | "es-ES" | "ja-JP" | "fr-FR" | "it-IT", NikeVoiceKit>;

interface NikeVoiceKit {
    URL:     string;
    Version: Version;
}

type Version = "1.0.1" | "1.0" | "2.0";

interface NikeVoiceKitsByVersion {
    "2": NikeVoiceKits;
}

interface iBooksDictionary {
    URL:       string;
    signature: string;
    Version:   Version;
    Locale:    string;
}

interface iPodUpdaterVersion {
    updaterDownloadURL: string;
    VisibleBuildID:     number;
    defaultColor:       DefaultColor;
    displayInAbout:     boolean;
    iPodFamily:         number;
    updaterFamily:      number;
    buildID:            number;
}

type DefaultColor = "" | "XXX" | "SZB" | "PFW";



interface IPodSupport {
    Windows:       ReleaseIPodSupport;
    "Windows-x64": ReleaseIPodSupport;
}

interface IPodVoiceOverKit {
    "Mac-x86_64":        ReleaseVOKit;
    "Mac-i386":          ReleaseVOKit;
    "Mac-ppc":           ReleaseVOKit;
    "Windows-x64":       Expand<ReleaseVOKit & ReleaseForWindows>;
    Windows:             Expand<ReleaseVOKit & ReleaseForWindows>;
    "Windows-AAS":       Expand<ReleaseVOKit & ReleaseForWindows>;
    ConditionerRules:    Record<"1" | "2", iPodVORuleset>;
    ArtistsExceptions:   Record<"1" | "2", iPodVORuleset>;
    ArtistsExceptionsV2: Record<"2", iPodVORuleset>;
    ConditionerRulesV2:  Record<"2", iPodVORuleset>;
}

interface iPodVORuleset {
    buildID:    string;
    BundleURL:  string;
    changelist: number;
}


type Expand<T> = T extends (...args: infer A) => infer R
  ? (...args: Expand<A>) => Expand<R>
  : T extends infer O
  ? { [K in keyof O]: O[K] }
  : never;

type Release = { Version: string };
type ReleaseForWindows = Expand<Release & { ExecutableURL: string; }>
type ReleaseVOKit = Expand<Release & { DocumentationURL: string; }>
type ReleaseIPodSupport =  Expand<ReleaseForWindows & { HasVoiceOverKit: string; }>




interface ConfiguratorVersion {
    SupportedProductVersionsByDeviceClass:  Record<"iPhone" | "iPad" | "iPod" | "AppleTV", OSVersionRange>;
    SupportedMobileDeviceFrameworkVersions: Record<"AirTrafficHost" | "MobileDevice", { Min: number }>;
}
