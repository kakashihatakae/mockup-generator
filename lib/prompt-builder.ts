import type {
  ProjectFormData,
  ModelSex,
  ModelRace,
  HairColor,
  BuildType,
  ClothingType,
  PictureType,
} from "@/types/database";

/* ─── Mapping helpers ─── */

const sexMap: Record<ModelSex, string> = {
  male: "male",
  female: "female",
};

const raceMap: Record<ModelRace, string> = {
  asian: "Asian",
  white: "White",
  african_american: "African American",
  latin: "Latin",
};

const hairMap: Record<HairColor, string> = {
  black: "black",
  white: "blonde",
  red: "red",
  brown: "brown",
};

const buildMap: Record<BuildType, string> = {
  skinny: "skinny",
  lean: "lean",
  athletic: "athletic",
  toned: "toned",
  jacked: "jacked and muscular",
  bulky: "bulky and large",
};

const clothingMap: Record<ClothingType, string> = {
  shirt: "oversized t-shirt",
  hoodie: "oversized hoodie",
};

const poseMap: Record<PictureType, string> = {
  front: "front-facing pose looking directly at the camera",
  back: "back-facing pose showing the back of the garment",
  both: "split image: left half shows the front-facing view, right half shows the back-facing view",
};

/* ─── Color name helper ─── */

function describeColor(hex: string): string {
  // Simple named color lookup for common values
  const named: Record<string, string> = {
    "#000000": "black",
    "#ffffff": "white",
    "#ff0000": "red",
    "#00ff00": "green",
    "#0000ff": "blue",
    "#ffff00": "yellow",
    "#ff00ff": "magenta",
    "#00ffff": "cyan",
    "#808080": "gray",
    "#c0c0c0": "silver",
    "#800000": "maroon",
    "#808000": "olive",
    "#008000": "dark green",
    "#800080": "purple",
    "#008080": "teal",
    "#000080": "navy",
    "#ffa500": "orange",
    "#ffc0cb": "pink",
    "#a52a2a": "brown",
    "#f5f5dc": "beige",
  };

  const lower = hex.toLowerCase();
  if (named[lower]) return named[lower];

  // Fallback: just describe it by hex
  return `${hex} colored`;
}

/* ─── Main prompt builder ─── */

export function buildPrompt(form: ProjectFormData): string {
  const sex = sexMap[form.model_sex];
  const race = raceMap[form.model_race];
  const hair = hairMap[form.hair_color];
  const build = buildMap[form.build_type];
  const clothing = clothingMap[form.clothing_type];
  const color = describeColor(form.clothing_color);
  const pose = poseMap[form.picture_type];
  const pants = form.pants_description?.trim() || "dark blue slim jeans";

  const hasGraphic = !!form.uploaded_graphic;
  const graphicClause = hasGraphic
    ? "with the uploaded graphic/design printed naturally on the fabric, following the folds, wrinkles, and contours of the garment realistically. The design must look screen-printed into the fabric, not digitally pasted."
    : "";

  const prompt = `CAMERA/PHONE DETAILS
Shot on iPhone 18 Pro, 1x, f/2
RAW/Unedited
Natural outdoor lighting from the sun. Soft shadows, realistic highlights.

SUBJECT
25 years old ${build} ${race} ${sex} with ${hair} hair, attractive and stylish.

OUTFIT
Wearing ${pants} and a ${color} ${clothing} ${graphicClause}.

POSE
${pose}. Natural relaxed stance with confident posture, slight smile. Standing outdoors.

LOCATION
Urban streetwear lifestyle setting with soft architecture and modern city aesthetics, slightly blurred background using shallow depth of field.

STYLE
Ultra realistic streetwear apparel mockup photo. The ${form.clothing_type === "hoodie" ? "hoodie has a thick heavyweight cotton texture with premium construction, slightly oversized sleeves, relaxed fit, ribbed cuffs, and a large kangaroo pocket" : "t-shirt has a premium heavyweight cotton texture, slightly oversized fit, dropped shoulders, ribbed collar, and clean finished hems"}. The fabric looks soft, dense, and slightly matte with natural folds and realistic stitching details.

Lighting is soft overcast daylight with realistic shadows and soft highlights on the fabric. The image should feel like a premium streetwear brand mockup photo.

REALISM DETAILS
- Natural wrinkles and folds around elbows, waist, and ${form.clothing_type === "hoodie" ? "pocket area" : "sleeves"}
- Realistic cotton texture and fabric weight
- Authentic streetwear proportions
- Professional DSLR photography look
- 50mm lens aesthetic
- Soft bokeh background
- High detail, photorealistic, premium fashion campaign quality
- Realistic skin texture and natural features
- Cinematic color grading`;

  return prompt;
}
