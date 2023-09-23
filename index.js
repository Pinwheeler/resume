import { promises as fs } from 'fs'
import * as theme from 'jsonresume-theme-contempo'
import puppeteer from 'puppeteer'
import { render } from 'resumed'

const resume = JSON.parse(await fs.readFile('resume.json', 'utf-8'))
const html = await render(resume, theme)

const browser = await puppeteer.launch({headless: "new"})
const page = await browser.newPage()

await page.setContent(html, { waitUntil: 'networkidle0' })
await page.pdf({ path: 'resume.pdf', format: 'a4', printBackground: true, margin: {top: 5, bottom: 5}})
await browser.close()

const resume1p = JSON.parse(await fs.readFile('resume_1p.json', 'utf-8'))
const html1p = await render(resume1p, theme)

const browser1p = await puppeteer.launch({headless: "new"})
const page1p = await browser1p.newPage()

await page1p.setContent(html1p, { waitUntil: 'networkidle0' })
await page1p.pdf({ path: 'resume_1p.pdf', format: 'a4', printBackground: true})