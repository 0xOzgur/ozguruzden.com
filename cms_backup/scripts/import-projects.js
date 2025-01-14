const fs = require('fs-extra');
const xml2js = require('xml2js');
const axios = require('axios');
const FormData = require('form-data');
const path = require('path');

const STRAPI_URL = 'http://localhost:1337';
const XML_PATH = '../../public/projects.xml';
const IMAGES_PATH = '../../public'; // img/portfolio zaten XML'de var

async function uploadImage(imagePath) {
  try {
    console.log('Trying to upload image from:', path.resolve(__dirname, imagePath));
    const formData = new FormData();
    const imageBuffer = await fs.readFile(path.resolve(__dirname, imagePath));
    formData.append('files', imageBuffer, path.basename(imagePath));

    const response = await axios.post(`${STRAPI_URL}/api/upload`, formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    return response.data[0].id;
  } catch (error) {
    console.error(`Error uploading image ${imagePath}:`, error.message);
    return null;
  }
}

async function importProjects() {
  try {
    // XML dosyasını oku
    const xmlData = await fs.readFile(path.resolve(__dirname, XML_PATH), 'utf8');
    const parser = new xml2js.Parser({ explicitArray: true }); // explicitArray'i true yaptık
    const result = await parser.parseStringPromise(xmlData);
    
    const projects = result.projects.project;

    for (const project of projects) {
      console.log(`Processing project: ${project.title[0]}`);

      // Resimleri yükle
      const imageId = await uploadImage(`${IMAGES_PATH}/${project.image[0]}`);
      const hoverImageId = await uploadImage(`${IMAGES_PATH}/${project.hoverImage[0]}`);

      // Tag'leri hazırla
      const tagComponents = project.tags[0].tag.map(tag => ({
        name: tag
      }));

      // Projeyi oluştur
      const projectData = {
        data: {
          title: project.title[0],
          description: project.description[0],
          link: project.link[0],
          github: project.github[0],
          image: imageId,
          hoverImage: hoverImageId,
          tags: tagComponents,
          publishedAt: new Date().toISOString()
        }
      };

      try {
        const response = await axios.post(`${STRAPI_URL}/api/project`, projectData);
        console.log(`Successfully imported: ${project.title[0]}`);
      } catch (error) {
        console.error(`Error creating project ${project.title[0]}:`, 
          error.response?.data?.error || error.message);
      }
    }

    console.log('Import completed!');
  } catch (error) {
    console.error('Import failed:', error);
  }
}

importProjects();