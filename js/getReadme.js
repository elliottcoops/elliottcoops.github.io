async function fetchReadme(repo, id) {
    const owner = 'elliottcoops'; // GitHub username
    const url = `https://api.github.com/repos/${owner}/${repo}/readme`;

    try {
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/vnd.github.v3.raw' // Fetch the raw content
            }
        });
        if (response.ok) {
            let readmeContent = await response.text();
            
            // Adjust image URLs in the README content
            const repoUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/`; // Adjust if the default branch is not 'main'
            
            readmeContent = adjustImages(readmeContent, repoUrl);

            const renderedContent = window.marked.parse(readmeContent);
            var updatedContent = moveHeadingsDown(renderedContent);
            updatedContent = addClassesToHeadings(updatedContent)

            document.getElementById(id).innerHTML = updatedContent;
        } else {
            document.getElementById(id).textContent = 'Error fetching README file';
        }
    } catch (error) {
        document.getElementById(id).textContent = 'Error fetching README file';
    }
}

function adjustImages(readmeContent, repoUrl) {
    let lastWidth = 'auto';
    let lastHeight = 'auto';

    // Handle HTML <img> tags
    readmeContent = readmeContent.replace(/<img\s+src="([^"]+)"\s+alt="([^"]*)"\s*(?:width="([^"]*)")?\s*(?:height="([^"]*)")?\s*\/>/gi, (match, src, alt, width, height) => {
        if (!src.startsWith('http')) {
            src = repoUrl + src;
        }
        lastWidth = width || 'auto';
        lastHeight = height || 'auto';
        console.log(`HTML Image - src: ${src}, width: ${lastWidth}, height: ${lastHeight}`);
        return `<img src="${src}" alt="${alt}" style="max-width: 40%; height: auto; display: block;" width="${lastWidth}" height="${lastHeight}" />`;
    });

    // Handle Markdown ![alt](src) images
    readmeContent = readmeContent.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
        if (!src.startsWith('http')) {
            src = repoUrl + src;
        }
        const widthStyle = lastWidth && lastWidth !== 'auto' ? `width: ${lastWidth};` : '';
        const heightStyle = lastHeight && lastHeight !== 'auto' ? `height: ${lastHeight};` : '';
        console.log(`Markdown Image - src: ${src}, width: ${widthStyle}, height: ${heightStyle}`);
        return `<img src="${src}" alt="${alt}" style="max-width: 40%; ${widthStyle} ${heightStyle} display: block;" />`;
    });

    return readmeContent;
}

function moveHeadingsDown(htmlContent) {
    return htmlContent.replace(/<h([1-6])>(.*?)<\/h\1>/gi, (match, level, content) => {
      const newLevel = Math.min(parseInt(level) + 1, 6);
      return `<h${newLevel}>${content}</h${newLevel}>`;
    });
  }

function addClassesToHeadings(htmlContent) {
    htmlContent = htmlContent.replace(/<h2>(.*?)<\/h2>/gi, (match, content) => {
        return `<h2 class="pb-2 pt-4 border-bottom">${content}</h2>`;
    });

    htmlContent = htmlContent.replace(/<h3>(.*?)<\/h3>/gi, (match, content) => {
        return `<h3 class="pb-2 pt-4">${content}</h3>`;
    });

    htmlContent = htmlContent.replace(/<h4>(.*?)<\/h4>/gi, (match, content) => {
        return `<h4 class="pb-2 pt-4">${content}</h4>`;
    });

    return htmlContent;
}

async function fetchPinnedRepos(username) {
    const url = `https://api.github.com/users/${username}/repos?per_page=100`; // Adjust the per_page limit if needed
    
    try {
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (response.ok) {
            const repos = await response.json();
            
            // Sort repositories by stars (or any other criteria)
            repos.sort((a, b) => b.stargazers_count - a.stargazers_count); // Example sorting by stars

            // Get the top 3 repositories
            const top3Repos = repos.slice(0, 3);

            return top3Repos.map(repo => ({
                name: repo.name,
                html_url: repo.html_url,
                description: repo.description
            }));
        } else {
            console.error('Error fetching repositories:', response.statusText);
            return [];
        }
    } catch (error) {
        console.error('Error fetching repositories:', error.message);
        return [];
    }
}
