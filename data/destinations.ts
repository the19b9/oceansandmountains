export type Region =
  | "Western Coast"
  | "Eastern Coast"
  | "Western Ghats"
  | "Eastern Ghats"
  | "North India"
  | "Himalayas";

export type State =
  | "Gujarat"
  | "Maharashtra"
  | "Goa"
  | "Karnataka"
  | "Kerala"
  | "Tamil Nadu"
  | "Andhra Pradesh"
  | "Odisha"
  | "West Bengal"
  | "Uttarakhand"
  | "Himachal Pradesh"
  | "Jammu & Kashmir"
  | "Sikkim"
  | "Arunachal Pradesh"
  | "Meghalaya"
  | "Rajasthan"
  | "Madhya Pradesh"
  | "Telangana";

export interface Beach {
  id: string;
  name: string;
  state: State;
  region: Region;
}

export interface Mountain {
  id: string;
  name: string;
  state: State;
  region: Region;
  altitude?: string;
}

export const BEACHES: Beach[] = [
  { id: "b1", name: "Dwarka Beach", state: "Gujarat", region: "Western Coast" },
  { id: "b2", name: "Mandvi Beach", state: "Gujarat", region: "Western Coast" },
  { id: "b3", name: "Somnath Beach", state: "Gujarat", region: "Western Coast" },
  { id: "b4", name: "Diu Beach", state: "Gujarat", region: "Western Coast" },
  { id: "b5", name: "Juhu Beach", state: "Maharashtra", region: "Western Coast" },
  { id: "b6", name: "Marine Drive", state: "Maharashtra", region: "Western Coast" },
  { id: "b7", name: "Alibaug Beach", state: "Maharashtra", region: "Western Coast" },
  { id: "b8", name: "Ganpatipule Beach", state: "Maharashtra", region: "Western Coast" },
  { id: "b9", name: "Tarkarli Beach", state: "Maharashtra", region: "Western Coast" },
  { id: "b10", name: "Baga Beach", state: "Goa", region: "Western Coast" },
  { id: "b11", name: "Calangute Beach", state: "Goa", region: "Western Coast" },
  { id: "b12", name: "Anjuna Beach", state: "Goa", region: "Western Coast" },
  { id: "b13", name: "Palolem Beach", state: "Goa", region: "Western Coast" },
  { id: "b14", name: "Vagator Beach", state: "Goa", region: "Western Coast" },
  { id: "b15", name: "Candolim Beach", state: "Goa", region: "Western Coast" },
  { id: "b16", name: "Arambol Beach", state: "Goa", region: "Western Coast" },
  { id: "b17", name: "Morjim Beach", state: "Goa", region: "Western Coast" },
  { id: "b18", name: "Colva Beach", state: "Goa", region: "Western Coast" },
  { id: "b19", name: "Gokarna Beach", state: "Karnataka", region: "Western Coast" },
  { id: "b20", name: "Om Beach", state: "Karnataka", region: "Western Coast" },
  { id: "b21", name: "Kudle Beach", state: "Karnataka", region: "Western Coast" },
  { id: "b22", name: "Kaup Beach", state: "Karnataka", region: "Western Coast" },
  { id: "b23", name: "Malpe Beach", state: "Karnataka", region: "Western Coast" },
  { id: "b24", name: "Murudeshwar Beach", state: "Karnataka", region: "Western Coast" },
  { id: "b25", name: "Kovalam Beach", state: "Kerala", region: "Western Coast" },
  { id: "b26", name: "Varkala Beach", state: "Kerala", region: "Western Coast" },
  { id: "b27", name: "Alleppey Beach", state: "Kerala", region: "Western Coast" },
  { id: "b28", name: "Marari Beach", state: "Kerala", region: "Western Coast" },
  { id: "b29", name: "Cherai Beach", state: "Kerala", region: "Western Coast" },
  { id: "b30", name: "Bekal Beach", state: "Kerala", region: "Western Coast" },
  { id: "b31", name: "Marina Beach", state: "Tamil Nadu", region: "Eastern Coast" },
  { id: "b32", name: "Elliot's Beach", state: "Tamil Nadu", region: "Eastern Coast" },
  { id: "b33", name: "Mahabalipuram Beach", state: "Tamil Nadu", region: "Eastern Coast" },
  { id: "b34", name: "Kanyakumari Beach", state: "Tamil Nadu", region: "Eastern Coast" },
  { id: "b35", name: "Rameswaram Beach", state: "Tamil Nadu", region: "Eastern Coast" },
  { id: "b36", name: "Pondicherry Beach", state: "Tamil Nadu", region: "Eastern Coast" },
  { id: "b37", name: "Promenade Beach", state: "Tamil Nadu", region: "Eastern Coast" },
  { id: "b38", name: "Visakhapatnam Beach", state: "Andhra Pradesh", region: "Eastern Coast" },
  { id: "b39", name: "Rushikonda Beach", state: "Andhra Pradesh", region: "Eastern Coast" },
  { id: "b40", name: "Yarada Beach", state: "Andhra Pradesh", region: "Eastern Coast" },
  { id: "b41", name: "Bheemunipatnam Beach", state: "Andhra Pradesh", region: "Eastern Coast" },
  { id: "b42", name: "Puri Beach", state: "Odisha", region: "Eastern Coast" },
  { id: "b43", name: "Chandipur Beach", state: "Odisha", region: "Eastern Coast" },
  { id: "b44", name: "Gopalpur Beach", state: "Odisha", region: "Eastern Coast" },
  { id: "b45", name: "Konark Beach", state: "Odisha", region: "Eastern Coast" },
  { id: "b46", name: "Digha Beach", state: "West Bengal", region: "Eastern Coast" },
  { id: "b47", name: "Mandarmani Beach", state: "West Bengal", region: "Eastern Coast" },
  { id: "b48", name: "Bakkhali Beach", state: "West Bengal", region: "Eastern Coast" },
  { id: "b49", name: "Shankarpur Beach", state: "West Bengal", region: "Eastern Coast" },
  { id: "b50", name: "Tajpur Beach", state: "West Bengal", region: "Eastern Coast" },
];

export const MOUNTAINS: Mountain[] = [
  { id: "m1", name: "Kedarkantha Trek", state: "Uttarakhand", region: "Himalayas", altitude: "3,810m" },
  { id: "m2", name: "Roopkund Trek", state: "Uttarakhand", region: "Himalayas", altitude: "4,800m" },
  { id: "m3", name: "Valley of Flowers", state: "Uttarakhand", region: "Himalayas", altitude: "3,658m" },
  { id: "m4", name: "Har Ki Dun Trek", state: "Uttarakhand", region: "Himalayas", altitude: "3,566m" },
  { id: "m5", name: "Brahmatal Trek", state: "Uttarakhand", region: "Himalayas", altitude: "3,475m" },
  { id: "m6", name: "Kuari Pass Trek", state: "Uttarakhand", region: "Himalayas", altitude: "3,876m" },
  { id: "m7", name: "Chopta Tungnath", state: "Uttarakhand", region: "Himalayas", altitude: "3,680m" },
  { id: "m8", name: "Deoriatal Chandrashila", state: "Uttarakhand", region: "Himalayas", altitude: "4,000m" },
  { id: "m9", name: "Dayara Bugyal", state: "Uttarakhand", region: "Himalayas", altitude: "3,408m" },
  { id: "m10", name: "Nag Tibba Trek", state: "Uttarakhand", region: "Himalayas", altitude: "3,022m" },
  { id: "m11", name: "Triund Trek", state: "Himachal Pradesh", region: "Himalayas", altitude: "2,850m" },
  { id: "m12", name: "Kheerganga Trek", state: "Himachal Pradesh", region: "Himalayas", altitude: "2,960m" },
  { id: "m13", name: "Hampta Pass Trek", state: "Himachal Pradesh", region: "Himalayas", altitude: "4,270m" },
  { id: "m14", name: "Bhrigu Lake Trek", state: "Himachal Pradesh", region: "Himalayas", altitude: "4,300m" },
  { id: "m15", name: "Prashar Lake Trek", state: "Himachal Pradesh", region: "Himalayas", altitude: "2,730m" },
  { id: "m16", name: "Indrahar Pass Trek", state: "Himachal Pradesh", region: "Himalayas", altitude: "4,342m" },
  { id: "m17", name: "Pin Parvati Pass", state: "Himachal Pradesh", region: "Himalayas", altitude: "5,319m" },
  { id: "m18", name: "Beas Kund Trek", state: "Himachal Pradesh", region: "Himalayas", altitude: "3,700m" },
  { id: "m19", name: "Chandrakhani Pass", state: "Himachal Pradesh", region: "Himalayas", altitude: "3,660m" },
  { id: "m20", name: "Sar Pass Trek", state: "Himachal Pradesh", region: "Himalayas", altitude: "4,200m" },
  { id: "m21", name: "Kashmir Great Lakes", state: "Jammu & Kashmir", region: "Himalayas", altitude: "4,100m" },
  { id: "m22", name: "Tarsar Marsar Trek", state: "Jammu & Kashmir", region: "Himalayas", altitude: "3,900m" },
  { id: "m23", name: "Kolahoi Glacier Trek", state: "Jammu & Kashmir", region: "Himalayas", altitude: "3,900m" },
  { id: "m24", name: "Gangbal Lake Trek", state: "Jammu & Kashmir", region: "Himalayas", altitude: "3,570m" },
  { id: "m25", name: "Sinthan Top", state: "Jammu & Kashmir", region: "Himalayas", altitude: "3,748m" },
  { id: "m26", name: "Goecha La Trek", state: "Sikkim", region: "Himalayas", altitude: "4,940m" },
  { id: "m27", name: "Sandakphu Trek", state: "Sikkim", region: "Himalayas", altitude: "3,636m" },
  { id: "m28", name: "Dzongri Trek", state: "Sikkim", region: "Himalayas", altitude: "4,020m" },
  { id: "m29", name: "Singalila Ridge Trek", state: "Sikkim", region: "Himalayas", altitude: "3,636m" },
  { id: "m30", name: "Tawang Monastery Trek", state: "Arunachal Pradesh", region: "Himalayas", altitude: "3,048m" },
  { id: "m31", name: "Mechuka Valley Trek", state: "Arunachal Pradesh", region: "Himalayas", altitude: "1,829m" },
  { id: "m32", name: "Bailey Trail", state: "Arunachal Pradesh", region: "Himalayas", altitude: "4,000m" },
  { id: "m33", name: "Living Root Bridges Trek", state: "Meghalaya", region: "North India", altitude: "500m" },
  { id: "m34", name: "David Scott Trail", state: "Meghalaya", region: "North India", altitude: "1,200m" },
  { id: "m35", name: "Mawphlang Sacred Forest", state: "Meghalaya", region: "North India", altitude: "1,680m" },
  { id: "m36", name: "Kalsubai Peak", state: "Maharashtra", region: "Western Ghats", altitude: "1,646m" },
  { id: "m37", name: "Harishchandragad Trek", state: "Maharashtra", region: "Western Ghats", altitude: "1,424m" },
  { id: "m38", name: "Rajmachi Trek", state: "Maharashtra", region: "Western Ghats", altitude: "884m" },
  { id: "m39", name: "Lohagad Trek", state: "Maharashtra", region: "Western Ghats", altitude: "1,033m" },
  { id: "m40", name: "Torna Fort Trek", state: "Maharashtra", region: "Western Ghats", altitude: "1,403m" },
  { id: "m41", name: "Visapur Fort Trek", state: "Maharashtra", region: "Western Ghats", altitude: "1,084m" },
  { id: "m42", name: "Sinhagad Fort Trek", state: "Maharashtra", region: "Western Ghats", altitude: "1,312m" },
  { id: "m43", name: "Ratangad Trek", state: "Maharashtra", region: "Western Ghats", altitude: "1,297m" },
  { id: "m44", name: "Naneghat Trek", state: "Maharashtra", region: "Western Ghats", altitude: "830m" },
  { id: "m45", name: "Korigad Trek", state: "Maharashtra", region: "Western Ghats", altitude: "929m" },
  { id: "m46", name: "Mullayanagiri Trek", state: "Karnataka", region: "Western Ghats", altitude: "1,930m" },
  { id: "m47", name: "Kudremukh Trek", state: "Karnataka", region: "Western Ghats", altitude: "1,894m" },
  { id: "m48", name: "Tadiandamol Trek", state: "Karnataka", region: "Western Ghats", altitude: "1,748m" },
  { id: "m49", name: "Kumara Parvatha Trek", state: "Karnataka", region: "Western Ghats", altitude: "1,712m" },
  { id: "m50", name: "Nandi Hills Trek", state: "Karnataka", region: "Western Ghats", altitude: "1,478m" },
  { id: "m51", name: "Skandagiri Trek", state: "Karnataka", region: "Western Ghats", altitude: "1,450m" },
  { id: "m52", name: "Brahmagiri Trek", state: "Karnataka", region: "Western Ghats", altitude: "1,608m" },
  { id: "m53", name: "Chembra Peak Trek", state: "Kerala", region: "Western Ghats", altitude: "2,100m" },
  { id: "m54", name: "Anamudi Peak Trek", state: "Kerala", region: "Western Ghats", altitude: "2,695m" },
  { id: "m55", name: "Meesapulimala Trek", state: "Kerala", region: "Western Ghats", altitude: "2,640m" },
  { id: "m56", name: "Agasthyakoodam Trek", state: "Kerala", region: "Western Ghats", altitude: "1,868m" },
  { id: "m57", name: "Doddabetta Peak", state: "Tamil Nadu", region: "Eastern Ghats", altitude: "2,637m" },
  { id: "m58", name: "Kolli Hills Trek", state: "Tamil Nadu", region: "Eastern Ghats", altitude: "1,300m" },
  { id: "m59", name: "Javadi Hills Trek", state: "Tamil Nadu", region: "Eastern Ghats", altitude: "1,140m" },
  { id: "m60", name: "Yelagiri Hills Trek", state: "Tamil Nadu", region: "Eastern Ghats", altitude: "1,410m" },
  { id: "m61", name: "Araku Valley Trek", state: "Andhra Pradesh", region: "Eastern Ghats", altitude: "1,350m" },
  { id: "m62", name: "Horsley Hills Trek", state: "Andhra Pradesh", region: "Eastern Ghats", altitude: "1,265m" },
  { id: "m63", name: "Tirumala Hills Trek", state: "Andhra Pradesh", region: "Eastern Ghats", altitude: "853m" },
  { id: "m64", name: "Deomali Peak", state: "Odisha", region: "Eastern Ghats", altitude: "1,672m" },
  { id: "m65", name: "Mahendragiri Trek", state: "Odisha", region: "Eastern Ghats", altitude: "1,501m" },
  { id: "m66", name: "Mount Abu Trek", state: "Rajasthan", region: "North India", altitude: "1,722m" },
  { id: "m67", name: "Guru Shikhar Trek", state: "Rajasthan", region: "North India", altitude: "1,722m" },
  { id: "m68", name: "Pachmarhi Trek", state: "Madhya Pradesh", region: "North India", altitude: "1,067m" },
  { id: "m69", name: "Dhupgarh Peak", state: "Madhya Pradesh", region: "North India", altitude: "1,350m" },
  { id: "m70", name: "Saptura Range Trek", state: "Madhya Pradesh", region: "North India", altitude: "1,180m" },
];

export const REGIONS: Region[] = [
  "Western Coast",
  "Eastern Coast",
  "Western Ghats",
  "Eastern Ghats",
  "North India",
  "Himalayas",
];

export const BEACH_STATES: State[] = [
  "Gujarat",
  "Maharashtra",
  "Goa",
  "Karnataka",
  "Kerala",
  "Tamil Nadu",
  "Andhra Pradesh",
  "Odisha",
  "West Bengal",
];

export const MOUNTAIN_STATES: State[] = [
  "Uttarakhand",
  "Himachal Pradesh",
  "Jammu & Kashmir",
  "Sikkim",
  "Arunachal Pradesh",
  "Meghalaya",
  "Maharashtra",
  "Karnataka",
  "Kerala",
  "Tamil Nadu",
  "Andhra Pradesh",
  "Odisha",
  "Rajasthan",
  "Madhya Pradesh",
];

export const BEACH_REGIONS: Region[] = ["Western Coast", "Eastern Coast"];

export const MOUNTAIN_REGIONS: Region[] = [
  "Himalayas",
  "Western Ghats",
  "Eastern Ghats",
  "North India",
];
