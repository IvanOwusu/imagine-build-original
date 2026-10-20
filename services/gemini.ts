import type { ArchitecturalDesign, DesignPreferences } from "../types";
type SiteDiscovery = { analysis: string; references: Array<{ title?: string; uri?: string }> };
async function request<T>(action:string,payload:Record<string,unknown>):Promise<T>{const response=await fetch("/api/gemini",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action,...payload})});const data=await response.json().catch(()=>({}));if(!response.ok)throw new Error(data.error||"AI request failed. Please try again.");return data as T}
export const analyzeSite=(image:string):Promise<SiteDiscovery>=>request("analyzeSite",{image});
export const askArchitect=(message:string,history:Array<{role:string;content:string}>):Promise<{text:string;sources:string[]}>=>
 request("askArchitect",{message,history});
export async function promptEditImage(image:string,prompt:string):Promise<string>{const r=await request<{image:string}>("promptEditImage",{image,prompt});return r.image||image}
export async function refineRealism(design:ArchitecturalDesign):Promise<string|null>{const r=await request<{image:string}>("refineRealism",{name:design.name,style:design.preferences.style,materials:design.preferences.materials});return r.image||null}
export const generateDesignConcept=(image:string,preferences:DesignPreferences,siteDiscovery:SiteDiscovery):Promise<ArchitecturalDesign>=>request("generateDesignConcept",{image,preferences,siteDiscovery});
export async function generate3DModelFile(design:ArchitecturalDesign):Promise<string>{const r=await request<{text:string}>("generate3DModelFile",{design:{name:design.name}});return r.text||""}
export async function generateGLTFModelFile(design:ArchitecturalDesign):Promise<string>{const r=await request<{text:string}>("generateGLTFModelFile",{design:{name:design.name}});return r.text||"{}"}
export async function getTutorialContent(featureKey:string):Promise<string>{const r=await request<{text:string}>("getTutorialContent",{featureKey});return r.text||"Capture your site to begin."}
export async function getLiveToken():Promise<string>{const r=await request<{token:string}>("liveToken",{});if(!r.token)throw new Error("Live voice token unavailable.");return r.token}
