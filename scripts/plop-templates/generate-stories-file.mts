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
const isStoriesFile = async (filePath: string): Promise<boolean> => {
  if (!filePath.includes('.stories.') && !filePath.includes('.story.')) {
    return false
  }
  const data = await fs.readFile(filePath)

  return data.includes('Story') || data.includes('Meta') || data.includes('@storybook/react')
}

const generateStories = async (
  folderPath: string,
  componentFileName: string,
  componentName: string,
) => {
  let storiesTemplate = await fs.readFile(
    path.resolve(__dirname, 'stories-file-template.txt'),
    'utf-8',
  )

  storiesTemplate = storiesTemplate.replaceAll(
    '{{componentFolder}}',
    folderPath.replace('src/', ''),
  )
  storiesTemplate = storiesTemplate.replaceAll('{{componentFileName}}', componentFileName)
  storiesTemplate = storiesTemplate.replaceAll('{{componentName}}', componentName)
  storiesTemplate = storiesTemplate.replaceAll('{{pascalCase name}}', componentName)
  storiesTemplate = storiesTemplate.replaceAll(
    '{{camelCase componentName}}',
    `${componentName.charAt(0).toLowerCase()}${componentName.slice(1)}`,
  )

  const fileName = `${componentFileName}.stories.tsx`

  await fs.writeFile(path.resolve(folderPath, fileName), storiesTemplate)

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

  let hasStory = false
  for (const file of files) {
    if (file.includes(name) || file.includes(componentName) || file.toLowerCase().includes(name)) {
      const isStory = await isStoriesFile(path.resolve(componentFolder, file))
      if (isStory) {
        hasStory = true
        break
      }
    }
  }

  if (!hasStory) {
    const fileName = await generateStories(
      componentFolder,
      isFile ? (name as string) : componentName,
      componentName,
    )
    console.log('Stories file generated:', fileName)
  } else {
    console.log('Stories file already exists')
  }
})()
