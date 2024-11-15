const fs = require('fs');
const Handlebars = require('handlebars');

// Read the template file
const template = fs.readFileSync('template.html', 'utf8');

// Compile the template
const compiledTemplate = Handlebars.compile(template);

// Read the data file
const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

// Generate the HTML content for each endpoint
data.endpoints.forEach(endpointData => {
    const htmlContent = compiledTemplate(endpointData);
    const filename = "../docs/" + endpointData.endpoint.replace(/\//g, '') + '.html';
    fs.writeFileSync(filename, htmlContent);
    console.log('Documentation generated:', filename);
});
