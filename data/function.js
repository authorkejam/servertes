let currentView = "novels";
let currentData = novels;
function sortData(data, criterion) {
  data.sort((a, b) => {
    if (criterion === "name") {
      const titleA =
        typeof a.title === "object"
          ? a.title[currentLang] || a.title.id
          : a.title;
      const titleB =
        typeof b.title === "object"
          ? b.title[currentLang] || b.title.id
          : b.title;
      return titleA.localeCompare(titleB);
    } else if (criterion === "latest") {
      const dateA = a.date
        ? new Date(a.date.split("-").reverse().join("-"))
        : new Date(0);
      const dateB = b.date
        ? new Date(b.date.split("-").reverse().join("-"))
        : new Date(0);
      return dateB - dateA;
    } else if (criterion === "oldest") {
      const dateA = a.date
        ? new Date(a.date.split("-").reverse().join("-"))
        : new Date(0);
      const dateB = b.date
        ? new Date(b.date.split("-").reverse().join("-"))
        : new Date(0);
      return dateA - dateB;
    } else if (criterion === "random") {
      return Math.random() - 0.5;
    }
  });
}

const sortBtn = document.getElementById("sortBtn");
const sortOptions = [
  { value: "latest", text: "Terbaru" },
  { value: "oldest", text: "Terlama" },
  { value: "name", text: "Nama A-Z" }
];
let currentSortIndex = 0;

sortBtn.addEventListener("click", showSortMenu);

// Set initial sort button text
sortBtn.textContent = `📔 ${sortOptions[currentSortIndex].text}`;

// Initial sort
sortData(currentData, "latest");

// Function to show sort menu
function showSortMenu() {
  // Remove existing menu if any
  const existingMenu = document.getElementById("sortMenu");
  if (existingMenu) existingMenu.remove();

  // Create menu container
  const menu = document.createElement("div");
  menu.id = "sortMenu";
  menu.style.position = "absolute";
  menu.style.backgroundColor = "var(--bg-color, #fff)";
  menu.style.border = "1px solid var(--border-color, #ccc)";
  menu.style.borderRadius = "8px";
  menu.style.padding = "20px";
  menu.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
  menu.style.zIndex = "1000";
  menu.style.minWidth = "200px";

  // Position below the button with left boundary check
  const buttonRect = sortBtn.getBoundingClientRect();
  let leftPos = buttonRect.left + buttonRect.width / 2 - 100;
  if (leftPos < 10) leftPos = 10; // Ensure at least 10px from left edge
  menu.style.top = (buttonRect.bottom + 5) + "px";
  menu.style.left = leftPos + "px";

  // Close button
  const closeBtn = document.createElement("button");
  closeBtn.textContent = "✕";
  closeBtn.style.position = "absolute";
  closeBtn.style.top = "10px";
  closeBtn.style.right = "10px";
  closeBtn.style.background = "none";
  closeBtn.style.border = "none";
  closeBtn.style.fontSize = "18px";
  closeBtn.style.cursor = "pointer";
  closeBtn.onclick = () => menu.remove();
  menu.appendChild(closeBtn);

  // Title
  const title = document.createElement("h3");
  title.textContent = "Sort Options";
  title.style.marginTop = "0";
  title.style.textAlign = "center";
  menu.appendChild(title);

  // Sort options
  sortOptions.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.textContent = option.text;
    btn.style.display = "block";
    btn.style.width = "100%";
    btn.style.margin = "10px 0";
    btn.style.padding = "10px";
    btn.style.border = "1px solid var(--border-color, #ccc)";
    btn.style.borderRadius = "4px";
    btn.style.backgroundColor = "var(--button-bg, #f0f0f0)";
    btn.style.cursor = "pointer";
    if (index === currentSortIndex) {
      btn.style.backgroundColor = "var(--accent-color, #007bff)";
      btn.style.color = "#fff";
    }
    btn.onclick = () => {
      currentSortIndex = index;
      sortData(currentData, option.value);
      renderGallery();
      sortBtn.textContent = `📔 ${option.text}`;
      menu.remove();
    };
    menu.appendChild(btn);
  });

  // Append menu to body
  document.body.appendChild(menu);

  // Close on click outside
  document.addEventListener("click", function closeMenu(e) {
    if (!menu.contains(e.target) && e.target !== sortBtn) {
      menu.remove();
      document.removeEventListener("click", closeMenu);
    }
  });
}

// Function to show theme menu
function showThemeMenu() {
  // Remove existing menu if any
  const existingMenu = document.getElementById("themeMenu");
  if (existingMenu) existingMenu.remove();

  // Create menu container
  const menu = document.createElement("div");
  menu.id = "themeMenu";
  menu.style.position = "absolute";
  menu.style.backgroundColor = "var(--bg-color, #fff)";
  menu.style.border = "1px solid var(--border-color, #ccc)";
  menu.style.borderRadius = "8px";
  menu.style.padding = "20px";
  menu.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
  menu.style.zIndex = "1000";
  menu.style.minWidth = "200px";

  // Position below the button
  const buttonRect = themeBtn.getBoundingClientRect();
  menu.style.top = (buttonRect.bottom + 5) + "px";
  menu.style.left = (buttonRect.left + buttonRect.width / 2 - 100) + "px";

  // Close button
  const closeBtn = document.createElement("button");
  closeBtn.textContent = "✕";
  closeBtn.style.position = "absolute";
  closeBtn.style.top = "10px";
  closeBtn.style.right = "10px";
  closeBtn.style.background = "none";
  closeBtn.style.border = "none";
  closeBtn.style.fontSize = "18px";
  closeBtn.style.cursor = "pointer";
  closeBtn.onclick = () => menu.remove();
  menu.appendChild(closeBtn);

  // Title
  const title = document.createElement("h3");
  title.textContent = "Theme Options";
  title.style.marginTop = "0";
  title.style.textAlign = "center";
  menu.appendChild(title);

  // Theme options
  themeOptions.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.textContent = option.text;
    btn.style.display = "block";
    btn.style.width = "100%";
    btn.style.margin = "10px 0";
    btn.style.padding = "10px";
    btn.style.border = "1px solid var(--border-color, #ccc)";
    btn.style.borderRadius = "4px";
    btn.style.backgroundColor = "var(--button-bg, #f0f0f0)";
    btn.style.cursor = "pointer";
    if (index === currentThemeIndex) {
      btn.style.backgroundColor = "var(--accent-color, #007bff)";
      btn.style.color = "#fff";
    }
    btn.onclick = () => {
      currentThemeIndex = index;
      applyTheme(option.value);
      themeBtn.textContent = `🎨 ${option.text}`;
      menu.remove();
    };
    menu.appendChild(btn);
  });

  // Append menu to body
  document.body.appendChild(menu);

  // Close on click outside
  document.addEventListener("click", function closeMenu(e) {
    if (!menu.contains(e.target) && e.target !== themeBtn) {
      menu.remove();
      document.removeEventListener("click", closeMenu);
    }
  });
}

// Function to show font menu
function showFontMenu() {
  // Remove existing menu if any
  const existingMenu = document.getElementById("fontMenu");
  if (existingMenu) existingMenu.remove();

  // Create menu container
  const menu = document.createElement("div");
  menu.id = "fontMenu";
  menu.style.position = "absolute";
  menu.style.backgroundColor = "var(--bg-color, #fff)";
  menu.style.border = "1px solid var(--border-color, #ccc)";
  menu.style.borderRadius = "8px";
  menu.style.padding = "20px";
  menu.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
  menu.style.zIndex = "1000";
  menu.style.minWidth = "200px";
  menu.style.maxHeight = "300px";
  menu.style.overflowY = "auto";

  // Position below the button
  const buttonRect = fontBtn.getBoundingClientRect();
  menu.style.top = (buttonRect.bottom + 5) + "px";
  menu.style.left = (buttonRect.left + buttonRect.width / 2 - 100) + "px";

  // Close button
  const closeBtn = document.createElement("button");
  closeBtn.textContent = "✕";
  closeBtn.style.position = "absolute";
  closeBtn.style.top = "10px";
  closeBtn.style.right = "10px";
  closeBtn.style.background = "none";
  closeBtn.style.border = "none";
  closeBtn.style.fontSize = "18px";
  closeBtn.style.cursor = "pointer";
  closeBtn.onclick = () => menu.remove();
  menu.appendChild(closeBtn);

  // Title
  const title = document.createElement("h3");
  title.textContent = "Font Options";
  title.style.marginTop = "0";
  title.style.textAlign = "center";
  menu.appendChild(title);

  // Font options
  fontOptions.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.textContent = option.text;
    btn.style.display = "block";
    btn.style.width = "100%";
    btn.style.margin = "10px 0";
    btn.style.padding = "10px";
    btn.style.border = "1px solid var(--border-color, #ccc)";
    btn.style.borderRadius = "4px";
    btn.style.backgroundColor = "var(--button-bg, #f0f0f0)";
    btn.style.cursor = "pointer";
    if (index === currentFontIndex) {
      btn.style.backgroundColor = "var(--accent-color, #007bff)";
      btn.style.color = "#fff";
    }
    btn.onclick = () => {
      currentFontIndex = index;
      updateFontFamily();
      fontBtn.textContent = `🔤 ${option.text}`;
      menu.remove();
    };
    menu.appendChild(btn);
  });

  // Append menu to body
  document.body.appendChild(menu);

  // Close on click outside
  document.addEventListener("click", function closeMenu(e) {
    if (!menu.contains(e.target) && e.target !== fontBtn) {
      menu.remove();
      document.removeEventListener("click", closeMenu);
    }
  });
}

// Improved markdown to HTML converter for basic markdown used here
function markdownToHTML(md) {
  const lines = md.split(/\r?\n/);
  let html = "";
  let inOrderedList = false;
  let inUnorderedList = false;
  let lastLineWasListItem = false;
  let lastListType = null;
  let paragraphBuffer = [];
  let listClass = "compact"; // default
  let listCounter = 0; // nomor terakhir

  const flushParagraph = () => {
    if (paragraphBuffer.length > 0) {
      html += "<p>" + paragraphBuffer.join(" ").trim() + "</p>";
      paragraphBuffer = [];
    }
  };

  const closeLists = () => {
    if (inOrderedList) {
      html += "</ol>";
      inOrderedList = false;
    }
    if (inUnorderedList) {
      html += "</ul>";
      inUnorderedList = false;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Baris kosong
    if (line === "") {
      if (inOrderedList || inUnorderedList) {
        lastLineWasListItem = false;
        listClass = "spaced"; // menandai jeda antar item list
      } else {
        flushParagraph();
      }
      continue;
    }

    // Horizontal rule
    if (/^[-*_]{3,}$/.test(line)) {
      flushParagraph();
      html += "<hr>";
      continue;
    }

    // Heading & blockquote
    if (/^#{1,3} /.test(line) || /^\> /.test(line)) {
      flushParagraph();
      const converted = line
        .replace(/^# (.*$)/, "<h1>$1</h1>")
        .replace(/^## (.*$)/, "<h2>$1</h2>")
        .replace(/^### (.*$)/, "<h3>$1</h3>")
        .replace(/^\> (.*$)/, (match, p1) => {
          const processed = p1
            .replace(/\*\*(.*)\*\*/g, "<strong>$1</strong>")
            .replace(/\*(.*)\*/g, "<em>$1</em>")
            .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1">')
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
          return `<blockquote>${processed}</blockquote>`;
        });
      html += converted;
      continue;
    }

    // Ordered list
    if (/^\d+\./.test(line)) {
      const content = line.replace(/^\d+\. ?/, "");
      listCounter++;

      if (!inOrderedList) {
        flushParagraph();
        html += `<ol class="${listClass}">`;
        inOrderedList = true;
        lastListType = "ordered";
      } else if (!lastLineWasListItem) {
        // Baris kosong sebelumnya → list baru tapi melanjutkan nomor
        html += `</ol><ol class="spaced" start="${listCounter}">`;
      }

      html += `<li>${content}</li>`;
      lastLineWasListItem = true;
      listClass = "compact";
      continue;
    }

    // Unordered list
    if (/^\- /.test(line)) {
      const content = line.replace(/^\- /, "");
      if (!inUnorderedList) {
        flushParagraph();
        html += `<ul class="${listClass}">`;
        inUnorderedList = true;
        lastListType = "unordered";
      } else if (!lastLineWasListItem) {
        html += `</ul><ul class="spaced">`;
      }
      html += `<li>${content}</li>`;
      lastLineWasListItem = true;
      listClass = "compact";
      continue;
    }

    // Bukan list
    if (inOrderedList || inUnorderedList) {
      closeLists();
      listCounter = 0; // reset nomor bila list berakhir total
    }

    // Paragraf
    paragraphBuffer.push(
      line
        .replace(/\*\*(.*)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*)\*/g, "<em>$1</em>")
        .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1">')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
    );
    lastLineWasListItem = false;
  }

  closeLists();
  flushParagraph();

  return html.trim();
}



const novelGallery = document.getElementById("novelGallery");
const sidebar = document.getElementById("sidebar");
const menuBtn = document.getElementById("menuBtn");
const backBtn = document.getElementById("backBtn");
const chapterList = document.getElementById("chapterList");
const reader = document.getElementById("reader");
const readerNovelTitle = document.getElementById("readerNovelTitle");
const readerChapterTitle = document.getElementById("readerChapterTitle");
const chapterContent = document.getElementById("chapterContent");
const novelTitle = document.getElementById("novelTitle");
const readerBackBtn = document.getElementById("readerBackBtn");

function updateBackButtons() {
  const viewName =
    currentView === "novella"
      ? "Novella"
      : currentView.charAt(0).toUpperCase() + currentView.slice(1);
  backBtn.textContent = `← Back to ${viewName}`;
  readerBackBtn.textContent = `← Back to ${viewName}`;
}

// Hide sidebar when clicking outside
document.addEventListener("click", (e) => {
  if (!sidebar.contains(e.target) && e.target !== menuBtn) {
    sidebar.classList.remove("active");
    menuBtn.style.display = "block";
    sidebarShownByHover = false;
    sidebarShownBySwipe = false;
  }
});

// Show sidebar on hover left edge (desktop)
document.addEventListener("mousemove", (e) => {
  if (currentNovel) {
    if (e.clientX < 60 && !sidebar.classList.contains("active")) {
      sidebar.classList.add("active");
      sidebarShownByHover = true;
      menuBtn.style.display = "none";
    } else if (
      e.clientX >= 60 &&
      sidebarShownByHover &&
      !sidebar.contains(e.target)
    ) {
      sidebar.classList.remove("active");
      sidebarShownByHover = false;
      menuBtn.style.display = "block";
    }
  }
});

// Hide sidebar on mouse leave (desktop) only if not in a novel
sidebar.addEventListener("mouseleave", () => {
  if (sidebarShownByHover && !currentNovel) {
    sidebar.classList.remove("active");
    sidebarShownByHover = false;
    menuBtn.style.display = "block";
  }
});

// Touch events for swipe right (mobile)
document.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
  touchInReader = reader.contains(e.touches[0].target);
});

document.addEventListener("touchend", (e) => {
  const touchEndX = e.changedTouches[0].clientX;
  const touchEndY = e.changedTouches[0].clientY;
  const deltaX = touchEndX - touchStartX;
  const deltaY = touchEndY - touchStartY;
  if (
    currentNovel &&
    Math.abs(deltaX) > Math.abs(deltaY) &&
    deltaX > 100 &&
    touchInReader &&
    !sidebar.classList.contains("active")
  ) {
    sidebar.classList.add("active");
    sidebarShownBySwipe = true;
    menuBtn.style.display = "none";
  } else if (
    Math.abs(deltaX) > Math.abs(deltaY) &&
    deltaX < -100 &&
    sidebar.classList.contains("active")
  ) {
    sidebar.classList.remove("active");
    sidebarShownBySwipe = false;
    menuBtn.style.display = "block";
  }
});

// Render novel gallery
function renderGallery() {
  novelGallery.innerHTML = "";
  if (currentData.length === 0) {
    const message =
      currentView === "novella"
        ? "No Novella available yet."
        : `No ${currentView} available yet.`;
    novelGallery.innerHTML = `<p>${message}</p>`;
    return;
  }
  if (currentView === "blogs") {
    novelGallery.classList.add("blog-view");
    currentData.forEach((item) => {
      item.chapters.forEach((chapter) => {
        const post = document.createElement("div");
        post.className = "blog-post";
        const title = document.createElement("h2");
        title.textContent = chapter.title;
        post.appendChild(title);
        const content = document.createElement("div");
        content.className = "blog-content";
        post.appendChild(content);
        novelGallery.appendChild(post);
        // Fetch and render content
        cachedFetch(chapter.file)
          .then((md) => {
            content.innerHTML = markdownToHTML(md);
          })
          .catch((error) => {
            content.innerHTML = "<p>Error loading content.</p>";
          });
      });
    });
    novelGallery.style.display = "block";
  } else if (currentView === "about") {
    novelGallery.classList.add("blog-view");
    currentData.forEach((item) => {
      item.chapters.forEach((chapter) => {
        const post = document.createElement("div");
        post.className = "blog-post";
        const title = document.createElement("h2");
        title.textContent = chapter.title;
        post.appendChild(title);
        const content = document.createElement("div");
        content.className = "blog-content";
        post.appendChild(content);
        novelGallery.appendChild(post);
        // Fetch and render content
        fetch(chapter.file)
          .then((response) => response.text())
          .then((md) => {
            content.innerHTML = markdownToHTML(md);
            // Update logo based on dark mode
            const img = content.querySelector('img[src*="authorputih.png"]');
            if (img) {
              img.src = document.body.classList.contains("dark")
                ? "../logo/authorhitam.png"
                : "../logo/authorputih.png";
            }
          })
          .catch((error) => {
            content.innerHTML = "<p>Error loading content.</p>";
          });
      });
    });
    novelGallery.style.display = "block";
  } else {
    novelGallery.classList.remove("blog-view");
    currentData.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "novel-card";

      if (item.cover) {
        const img = document.createElement("img");
        img.src = item.cover;
        img.alt = item.title + " cover";
        img.loading = "lazy";
        card.appendChild(img);
      }

      // Judul
      const title = document.createElement("div");
      title.className = "novel-title";
      title.textContent = item.title;
      card.appendChild(title);

      // Date
      if (item.date) {
        const date = document.createElement("div");
        date.className = "novel-date";
        date.textContent = item.date;
        card.appendChild(date);
      }

      //Status
      if (item.status) {
        const status = document.createElement("div");
        status.className = "novel-status";
        status.textContent = item.status;
        card.appendChild(status);
      }

      // Genre
      if (item.genre) {
        const genre = document.createElement("div");
        genre.className = "novel-genre outline-text";
        genre.textContent = "" + item.genre.join(", ");
        card.appendChild(genre);
      }

      //warna novel card
      if (item.title === "Being Kind?") {
        card.classList.add("being-kind");
      }

      card.onclick = () => openNovel(item);
      novelGallery.appendChild(card);

      // Add slide down animation with stagger
      setTimeout(() => {
        card.classList.add("animate-in");
      }, index * 100);
    });
    novelGallery.style.display = "grid";
  }
  reader.classList.remove("active");
  menuBtn.style.display = "none";
  sidebar.classList.remove("active");
  readerBackBtn.style.display = "none";
  sidebarShownByHover = false;
  sidebarShownBySwipe = false;
}

// Open novel and show chapters in sidebar
function openNovel(novel) {
  currentNovel = novel;
  novelTitle.textContent = novel.title;
  chapterList.innerHTML = "";
  novel.chapters.forEach((chapter, index) => {
    const button = document.createElement("button");
    button.textContent = chapter.title;
    button.onclick = () => openChapter(index);
    chapterList.appendChild(button);
  });
  sidebar.classList.add("active");
  menuBtn.style.display = "none";
  novelGallery.style.display = "none";
  reader.classList.add("active");
  readerBackBtn.style.display = "block";
  // Push state for back navigation
  history.pushState({ page: 'reader' }, '', '');
  // Load last read chapter or first chapter
  const savedChapter = localStorage.getItem(`novel-${novel.id}-chapter`);
  const startIndex = savedChapter !== null ? parseInt(savedChapter) : 0;
  openChapter(startIndex);
  sidebarShownByHover = false;
  sidebarShownBySwipe = false;
}

// Cache for fetched content (in-memory)
const contentCache = new Map();

// Cached fetch function with localStorage persistence
async function cachedFetch(url) {
  // Check in-memory cache first
  if (contentCache.has(url)) {
    return contentCache.get(url);
  }

  // Check localStorage cache
  const cacheKey = `contentCache_${btoa(url)}`; // Base64 encode URL for safe key
  const cachedData = localStorage.getItem(cacheKey);
  if (cachedData) {
    try {
      const { content, timestamp } = JSON.parse(cachedData);
      const now = Date.now();
      const cacheDuration = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      if (now - timestamp < cacheDuration) {
        // Cache is valid, use it
        contentCache.set(url, content); // Also set in-memory
        return content;
      } else {
        // Cache expired, remove it
        localStorage.removeItem(cacheKey);
      }
    } catch (e) {
      // Invalid cache data, remove it
      localStorage.removeItem(cacheKey);
    }
  }

  // Fetch from server
  try {
    const response = await fetch(url);
    const text = await response.text();
    // Store in both caches
    contentCache.set(url, text);
    const cacheData = {
      content: text,
      timestamp: Date.now(),
    };
    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
    return text;
  } catch (error) {
    throw error;
  }
}

// Open chapter and render content
function openChapter(index) {
  if (!currentNovel) return;
  if (index < 0 || index >= currentNovel.chapters.length) return;
  const chapter = currentNovel.chapters[index];
  currentChapterIndex = index;
  localStorage.setItem(`novel-${currentNovel.id}-chapter`, index);
  readerNovelTitle.textContent = currentNovel.title;
  readerChapterTitle.textContent = chapter.title;
  chapterContent.classList.remove("content-visible");
  cachedFetch(chapter.file)
    .then((md) => {
      chapterContent.innerHTML = markdownToHTML(md);
      chapterContent.classList.add("content-visible");
      window.scrollTo({ top: 0, behavior: "smooth" });
    })
    .catch((error) => {
      chapterContent.innerHTML = "<p>Error loading chapter.</p>";
    });
  // Update current chapter highlight
  const buttons = chapterList.querySelectorAll("button");
  buttons.forEach((btn, i) => {
    if (i === index) {
      btn.classList.add("current-chapter");
    } else {
      btn.classList.remove("current-chapter");
    }
  });
  // Hide sidebar when switching chapters
  sidebar.classList.remove("active");
  menuBtn.style.display = "block";
  sidebarShownByHover = false;
  sidebarShownBySwipe = false;
}

// Back to novel gallery
backBtn.onclick = () => {
  currentNovel = null;
  renderGallery();
  menuBtn.style.display = "none";
  readerBackBtn.style.display = "none";
  sidebarShownByHover = false;
  sidebarShownBySwipe = false;
};

// Reader back button
readerBackBtn.onclick = () => {
  currentNovel = null;
  renderGallery();
  sidebarShownByHover = false;
  sidebarShownBySwipe = false;
};

// Add event listeners for view buttons
const novelsBtn = document.getElementById("novelsBtn");
const blogsBtn = document.getElementById("blogsBtn");
const novellaBtn = document.getElementById("novellaBtn");

novelsBtn.addEventListener("click", () => {
  currentView = "novels";
  currentData = novels;
  currentNovel = null;
  sortData(currentData, sortOptions[currentSortIndex].value);
  updateBackButtons();
  sidebar.classList.remove("active");
  menuBtn.style.display = "none";
  sidebarShownByHover = false;
  sidebarShownBySwipe = false;
  renderGallery();
});

blogsBtn.addEventListener("click", () => {
  currentView = "blogs";
  currentData = blogs;
  currentNovel = null;
  sortData(currentData, sortOptions[currentSortIndex].value);
  updateBackButtons();
  sidebar.classList.remove("active");
  menuBtn.style.display = "none";
  sidebarShownByHover = false;
  sidebarShownBySwipe = false;
  renderGallery();
});

novellaBtn.addEventListener("click", () => {
  currentView = "novella";
  currentData = novella;
  currentNovel = null;
  sortData(currentData, sortOptions[currentSortIndex].value);
  updateBackButtons();
  sidebar.classList.remove("active");
  menuBtn.style.display = "none";
  sidebarShownByHover = false;
  sidebarShownBySwipe = false;
  renderGallery();
});

const aboutBtn = document.getElementById("aboutBtn");
aboutBtn.addEventListener("click", () => {
  currentView = "about";
  currentData = about;
  currentNovel = null;
  sortData(currentData, sortOptions[currentSortIndex].value);
  updateBackButtons();
  sidebar.classList.remove("active");
  menuBtn.style.display = "none";
  sidebarShownByHover = false;
  sidebarShownBySwipe = false;
  renderGallery();
});

// Track current chapter index for navigation
let currentChapterIndex = 0;
let currentNovel = null; // Added to fix ReferenceError for currentNovel
let touchInReader = false;

// Previous and Next chapter buttons
const prevChapterBtn = document.getElementById("prevChapterBtn");
const nextChapterBtn = document.getElementById("nextChapterBtn");

prevChapterBtn.addEventListener("click", () => {
  if (!currentNovel) return;
  if (currentChapterIndex > 0) {
    openChapter(currentChapterIndex - 1);
  }
});

nextChapterBtn.addEventListener("click", () => {
  if (!currentNovel) return;
  if (currentChapterIndex < currentNovel.chapters.length - 1) {
    openChapter(currentChapterIndex + 1);
  }
});

// Toggle sidebar menu or back to novels on phone
menuBtn.onclick = () => {
  currentNovel = null;
  renderGallery();
  menuBtn.style.display = "none";
  readerBackBtn.style.display = "none";
  sidebarShownByHover = false;
  sidebarShownBySwipe = false;
};

// Handle device back button navigation
window.addEventListener('popstate', (event) => {
  if (currentNovel) {
    currentNovel = null;
    renderGallery();
  }
});

// Initial render
renderGallery();

// Font selection logic
const fontBtn = document.getElementById("fontBtn");
const fontOptions = [
  { value: "Arial, sans-serif", text: "Arial" },
  { value: "Verdana, sans-serif", text: "Verdana" },
  { value: "'Trebuchet MS', sans-serif", text: "Trebuchet MS" },
  { value: "'Times New Roman', serif", text: "Times New" },
  { value: "'Courier New', monospace", text: "Courier New" },
  { value: "Georgia, serif", text: "Georgia" },
  { value: "'Open Sans', sans-serif", text: "Open Sans" },
  { value: "'Lato', sans-serif", text: "Lato" },
  { value: "'Montserrat', sans-serif", text: "Montserrat" },
  { value: "'Oswald', sans-serif", text: "Oswald" },
  { value: "'Raleway', sans-serif", text: "Raleway" },
  { value: "'Poppins', sans-serif", text: "Poppins" },
  { value: "'Playfair Display', serif", text: "Playfair" },
  { value: "'Merriweather', serif", text: "Merriweather" },
  { value: "'Inter', sans-serif", text: "Inter" },
  { value: "'Quicksand', sans-serif", text: "Quicksand" },
  { value: "'Karla', sans-serif", text: "Karla" },
  { value: "'Mulish', sans-serif", text: "Mulish" },
  { value: "'Manrope', sans-serif", text: "Manrope" },
  { value: "'Outfit', sans-serif", text: "Outfit" },
  { value: "'Readex Pro', sans-serif", text: "Readex" },
  { value: "'Space Grotesk', sans-serif", text: "Space Gro" },
  { value: "'JetBrains Mono', monospace", text: "JetBrains" },
  { value: "'Fira Code', monospace", text: "Fira Code" },
  { value: "'Space Mono', monospace", text: "Space Mono" },
  { value: "'Noto Sans', sans-serif", text: "Noto Sans" },
  { value: "'Lora', serif", text: "Lora" },
  { value: "'Crimson Text', serif", text: "Crimson Text" },
  { value: "'Libre Baskerville', serif", text: "Baskerville" },
  { value: "'Vollkorn', serif", text: "Vollkorn" },
  { value: "'EB Garamond', serif", text: "Garamond" },
  { value: "'Old Standard TT', serif", text: "Old Standard" },
  { value: "'Kalam', cursive", text: "Kalam" },
  { value: "'Shadows Into Light', cursive", text: "Shadows Light" },
  { value: "'Caveat', cursive", text: "Caveat" },
  { value: "'Satisfy', cursive", text: "Satisfy" },
  { value: "'Dancing Script', cursive", text: "Dancing Scr" },
  { value: "'Great Vibes', cursive", text: "Great Vibes" },
  { value: "'Allura', cursive", text: "Allura" }
];
let currentFontIndex = fontOptions.findIndex(option => option.value === (localStorage.getItem("selectedFont") || "Arial, sans-serif"));

function updateFontFamily() {
  chapterContent.style.fontFamily = fontOptions[currentFontIndex].value;
  localStorage.setItem("selectedFont", fontOptions[currentFontIndex].value);
}

fontBtn.addEventListener("click", showFontMenu);

// Set initial font
updateFontFamily();
fontBtn.textContent = `🔤 ${fontOptions[currentFontIndex].text}`;

// Font size control logic
const decreaseFontBtn = document.getElementById("decreaseFont");
const increaseFontBtn = document.getElementById("increaseFont");
let currentFontSize = 16; // default font size in px

function updateFontSize() {
  chapterContent.style.fontSize = currentFontSize + "px";
  /*const paragraphs = chapterContent.querySelectorAll('p');
        paragraphs.forEach(p => {
          p.style.fontSize = currentFontSize + 'px';
        });*/
}

decreaseFontBtn.addEventListener("click", () => {
  if (currentFontSize > 10) {
    // minimum font size
    currentFontSize -= 2;
    updateFontSize();
  }
});

increaseFontBtn.addEventListener("click", () => {
  if (currentFontSize < 36) {
    // maximum font size
    currentFontSize += 2;
    updateFontSize();
  }
});

// Track current text alignment, default to 'left'
let currentTextAlign = "left";

// Update font size after loading chapter content
const originalOpenChapter = openChapter;
openChapter = function (index) {
  originalOpenChapter(index);
  // Delay update to ensure content is loaded
  setTimeout(() => {
    updateFontSize();
    updateFontFamily();
    chapterContent.style.textAlign = currentTextAlign; // apply last selected alignment/ingat pilihan align terakhir
  }, 100);
};

// Text alignment control logic
const alignLeftBtn = document.getElementById("alignLeft");
const alignCenterBtn = document.getElementById("alignCenter");
const alignJustifyBtn = document.getElementById("alignJustify");

alignLeftBtn.addEventListener("click", () => {
  chapterContent.style.textAlign = "left";
  currentTextAlign = "left";
});

alignCenterBtn.addEventListener("click", () => {
  chapterContent.style.textAlign = "center";
  currentTextAlign = "center";
});

alignJustifyBtn.addEventListener("click", () => {
  chapterContent.style.textAlign = "justify";
  currentTextAlign = "justify";
});

// Hide header and footer on scroll
let lastScrollTop = 0;
window.addEventListener("scroll", function () {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop && scrollTop > 100) {
    document.querySelector(".normal-header").classList.add("hidden");
    document.querySelector(".normal-footer").classList.add("hidden");
  } else {
    document.querySelector(".normal-header").classList.remove("hidden");
    document.querySelector(".normal-footer").classList.remove("hidden");
  }
  lastScrollTop = scrollTop;
});

// Function to update logos based on dark mode
function updateLogos() {
  const isDark = document.body.classList.contains("dark");
  const logos = document.querySelectorAll(
    'img[src*="authorputih.png"], img[src*="authorhitam.png"]'
  );
  logos.forEach((img) => {
    img.src = isDark ? "../logo/authorhitam.png" : "../logo/authorputih.png";
  });
}

// Dark mode toggle
const darkModeToggle = document.getElementById("darkModeToggle");

// Load dark mode preference on page load
const savedDarkMode = localStorage.getItem("darkMode");
if (savedDarkMode === "true") {
  document.body.classList.add("dark");
  darkModeToggle.textContent = "☀️";
} else {
  darkModeToggle.textContent = "🌙";
}
updateLogos();

darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  darkModeToggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("darkMode", isDark);
  updateLogos();
  // Apply the last selected theme
  applyTheme(themeOptions[currentThemeIndex].value);
});

// Theme selection logic
const themeBtn = document.getElementById("themeBtn");
const themeOptions = [
  { value: "default", text: "Default" },
  { value: "blue", text: "Blue" },
  { value: "mid-night", text: "Midnight" },
  { value: "metalic-blue", text: "Metalic Blue" },
  { value: "steel-gray", text: "Steel Gray" },
  { value: "dark-velvet", text: "Dark Velvet" },
  { value: "true-noir", text: "True Noir" }
];
let currentThemeIndex = themeOptions.findIndex(option => option.value === (localStorage.getItem("selectedTheme") || "default"));

function applyTheme(theme) {
  // Remove all theme classes
  document.body.classList.remove(
    "blue",
    "mid-night",
    "metalic-blue",
    "steel-gray",
    "dark-velvet",
    "true-noir"
  );
  if (theme !== "default" && document.body.classList.contains("dark")) {
    document.body.classList.add(theme);
  }
  localStorage.setItem("selectedTheme", theme);
}

themeBtn.addEventListener("click", showThemeMenu);

// Set initial theme
applyTheme(themeOptions[currentThemeIndex].value);
themeBtn.textContent = `🎨 ${themeOptions[currentThemeIndex].text}`;

// Intro animation
document.addEventListener("DOMContentLoaded", function () {
  const introHeader = document.querySelector(".intro-header");
  const introFooter = document.querySelector(".intro-footer");
  const normalHeader = document.querySelector(".normal-header");
  const normalFooter = document.querySelector(".normal-footer");
  const mainContainer = document.querySelector(".main-container");
  const darkModeToggle = document.getElementById("darkModeToggle");

  // Initially hide main content and toggle
  mainContainer.style.opacity = "0";
  darkModeToggle.style.display = "none";

  // Letters animate automatically via CSS (slide in from right with stagger)

  // After letters finish animating (2.2s), open doors and reveal content immediately
  setTimeout(() => {
    introHeader.style.transform = "translateY(-100%)";
    introFooter.style.transform = "translateY(100%)";

    // Reveal main content and normal header/footer
    mainContainer.style.opacity = "1";
    darkModeToggle.style.display = "block";
    darkModeToggle.style.opacity = "1";
    normalHeader.style.display = "block";
    normalFooter.style.display = "block";
  }, 2200);
});
