import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(import.meta.url)
  .split('/')
  .slice(0, -1)
  .join('/')

const componentPath = process.argv[2]

if (!componentPath) {
  process.exit(3)
}
const isTestFile = async (filePath: string): Promise<boolean> => {
  if (!filePath.includes('.test.') && !filePath.includes('.spec.')) {
    return false
  }
  const data = await fs.readFile(filePath)

  return (
    data.includes('it(') ||
    data.includes('describe(') ||
    data.includes('test(') ||
    data.includes('expect(')
  )
}

const generateTest = async (
  folderPath: string,
  componentFileName: string,
  componentName: string,
) => {
  let testTemplate = await fs.readFile(path.resolve(__dirname, 'test-file-template.txt'), 'utf-8')

  testTemplate = testTemplate.replaceAll('{{componentFolder}}', folderPath.replace('src/', ''))
  testTemplate = testTemplate.replaceAll('{{componentFileName}}', componentFileName)
  testTemplate = testTemplate.replaceAll('{{componentName}}', componentName)
  testTemplate = testTemplate.replaceAll('{{pascalCase name}}', componentName)

  const fileName = `${componentFileName}.test.tsx`

  await fs.writeFile(path.resolve(folderPath, fileName), testTemplate)

  return fileName
}

;(async () => {
  const stats = await fs.lstat(componentPath)

  const isFile = stats.isFile()

  const componentFolder = isFile ? componentPath.split('/').slice(0, -1).join('/') : componentPath

  const name = isFile
    ? componentPath.split('/').pop()?.split('.')[0]
    : componentPath.split('/').pop()

  const componentName = `${name.charAt(0).toUpperCase()}${name.slice(1)}`

  const files = await fs.readdir(componentFolder)

  let hasTest = false
  for (const file of files) {
    if (file.includes(name) || file.includes(componentName) || file.toLowerCase().includes(name)) {
      const isTest = await isTestFile(path.resolve(componentFolder, file))
      if (isTest) {
        hasTest = true
        break
      }
    }
  }

  if (!hasTest) {
    const fileName = await generateTest(
      componentFolder,
      isFile ? (name as string) : componentName,
      componentName,
    )
    console.log('Test generated:', fileName)
  } else {
    console.log('Test file already exists')
  }
})()
