const inquirer = require('inquirer');
const _ = require('lodash')
const fs = require('fs');
const path = require('path');

const getData = async () => {
  const meta = await inquirer.prompt([
    {
      type: 'string',
      message: `folder name post?`,
      name: 'folder',
    },
    {
      type: 'string',
      message: `Title of post?`,
      name: 'title',
    },
    {
      type: 'input',
      message: `Description of post?`,
      name: 'description',
    },
    {
      type: 'input',
      message: `Tags of post (Comma separated)?`,
      name: 'tags',
    },
  ]);

  return meta;
}

const getFrontmatter = ({
  title,
  description,
  tags,
  folder,
}) => {
  const today = new Date()
  const todayTimezoneOffset = today.getTime() - (today.getTimezoneOffset() * 60000)
  const todayISODate = new Date(todayTimezoneOffset).toISOString()

  return {
    folder,
    frontmatter: {
      title: `"${title}"`,
      date: todayISODate,
      tags: `[${tags
        .split(',')
        .map(tag => `"${tag.trim()}"`)
        .join(',')}]`,
      description: `"${description}"`,
      published: false,
    }
  }
}

const getConfirmation = async (frontmatter) => {
  console.log(`Creating a new post with the following data.`);
  console.log(JSON.stringify(frontmatter, null, 4));
  const confirm = await inquirer.prompt([
    {
      type: 'confirm',
      message: 'Are you sure?',
      name: 'confirm',
    },
  ]);
  return confirm.confirm;
};

const createPage = async (frontmatter, folder) => {
  const markdown = `---${Object.keys(frontmatter).reduce(
    (prev, current) => `${prev}\n${current}: ${frontmatter[current]}`,
    ''
  )}\n---\n\nA new post`;

  const { date } = frontmatter;

  const fullDate = date.slice(0, 10);
  const folderName = `${fullDate}___${_.kebabCase(folder)}`;
  const pathContent = path.join(
    __dirname,
    `../src/content/${folderName}`
  );

  const filepath = `${pathContent}/index.md`;

  console.log(`Creating new post at ${filepath}`);

  if (!fs.existsSync(pathContent)) {
    fs.mkdirSync(pathContent);
  }

  fs.open(filepath, 'wx', (err, fd) => {
    if (err) {
      if (err.code === 'EEXIST') {
        console.error(
          'File already exists. Exiting. Edit it manually or try a new name'
        );
      }
      return;
    }
    fs.writeFile(fd, markdown, err => {
      if (err) {
        console.error('Failed');
        console.error(err);
      } else {
        console.log('Success. Please edit:');
        console.log(filepath);
      }
    });
  });
};

const init = () => {
  getData().then(async data => {
    const meta = getFrontmatter(data);
    const confirmed = await getConfirmation(meta.frontmatter);
    if (!confirmed) {
      init();
      return;
    }
    console.log(`Creating new post`);
    createPage(meta.frontmatter, meta.folder);
  });
}

init();