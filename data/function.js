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

        const sortSelect = document.getElementById("sortSelect");
        sortSelect.addEventListener("change", () => {
          sortData(currentData, sortSelect.value);
          renderGallery();
        });

        // Initial sort
        sortData(currentData, "latest");

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
                .replace(/^\> (.*$)/, "<blockquote>$1</blockquote>");
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
                .replace(
                  /\[([^\]]+)\]\(([^)]+)\)/g,
                  '<a href="$2" target="_blank">$1</a>'
                )
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
        const readerChapterTitle =
          document.getElementById("readerChapterTitle");
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
                fetch(chapter.file)
                  .then((response) => response.text())
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
                    const img = content.querySelector(
                      'img[src*="authorputih.png"]'
                    );
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
          // Load last read chapter or first chapter
          const savedChapter = localStorage.getItem(
            `novel-${novel.id}-chapter`
          );
          const startIndex = savedChapter !== null ? parseInt(savedChapter) : 0;
          openChapter(startIndex);
          sidebarShownByHover = false;
          sidebarShownBySwipe = false;
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
          fetch(chapter.file)
            .then((response) => response.text())
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
          sortData(currentData, sortSelect.value);
          updateBackButtons();
          renderGallery();
        });

        blogsBtn.addEventListener("click", () => {
          currentView = "blogs";
          currentData = blogs;
          sortData(currentData, sortSelect.value);
          updateBackButtons();
          renderGallery();
        });

        novellaBtn.addEventListener("click", () => {
          currentView = "novella";
          currentData = novella;
          sortData(currentData, sortSelect.value);
          updateBackButtons();
          renderGallery();
        });

        const aboutBtn = document.getElementById("aboutBtn");
        aboutBtn.addEventListener("click", () => {
          currentView = "about";
          currentData = about;
          sortData(currentData, sortSelect.value);
          updateBackButtons();
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

        // Toggle sidebar menu
        menuBtn.onclick = () => {
          sidebar.classList.toggle("active");
          if (sidebar.classList.contains("active")) {
            menuBtn.style.display = "none";
          }
          sidebarShownByHover = false;
          sidebarShownBySwipe = false;
        };

        // Initial render
        renderGallery();

        // Font selection logic
        const fontSelect = document.getElementById("fontSelect");
        let currentFontFamily =
          localStorage.getItem("selectedFont") || "Arial, sans-serif";

        function updateFontFamily() {
          chapterContent.style.fontFamily = currentFontFamily;
          //const blogContents = document.querySelectorAll('.blog-content');
          //blogContents.forEach(content => content.style.fontFamily = currentFontFamily);
          localStorage.setItem("selectedFont", currentFontFamily);
        }

        fontSelect.addEventListener("change", () => {
          currentFontFamily = fontSelect.value;
          updateFontFamily();
        });

        // Set initial font from localStorage
        fontSelect.value = currentFontFamily;
        updateFontFamily();

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
          // Override fetch error with translation
          fetch(chapter.file)
            .then((response) => response.text())
            .then((md) => {
              chapterContent.innerHTML = markdownToHTML(md);
              chapterContent.classList.add("content-visible");
              window.scrollTo({ top: 0, behavior: "smooth" });
            })
            .catch((error) => {
              chapterContent.innerHTML =
                "<p>" +
                getTranslation(currentLang, "errorLoadingChapter") +
                "</p>";
            });
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
          let scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;
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
            img.src = isDark
              ? "../logo/authorhitam.png"
              : "../logo/authorputih.png";
          });
        }

        // Dark mode toggle
        const darkModeToggle = document.getElementById("darkModeToggle");

        // Load dark mode preference on page load
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode === 'true') {
          document.body.classList.add('dark');
          darkModeToggle.textContent = '☀️';
        } else {
          darkModeToggle.textContent = '🌙';
        }
        updateLogos();

        darkModeToggle.addEventListener("click", () => {
          document.body.classList.toggle("dark");
          const isDark = document.body.classList.contains("dark");
          darkModeToggle.textContent = isDark ? "☀️" : "🌙";
          localStorage.setItem('darkMode', isDark);
          updateLogos();
          // Apply the last selected theme
          applyTheme(currentTheme);
          themeSelect.value = currentTheme;
        });

        // Theme selection logic
        const themeSelect = document.getElementById("themeSelect");
        let currentTheme = localStorage.getItem("selectedTheme") || "default";

        function applyTheme(theme) {
          // Remove all theme classes
          document.body.classList.remove("blue", "mid-night", "metalic-blue", "steel-gray", "dark-velvet", "true-noir");
          if (theme !== "default" && document.body.classList.contains("dark")) {
            document.body.classList.add(theme);
          }
          localStorage.setItem("selectedTheme", theme);
        }

        themeSelect.addEventListener("change", () => {
          currentTheme = themeSelect.value;
          applyTheme(currentTheme);
        });

        // Set initial theme
        themeSelect.value = currentTheme;
        applyTheme(currentTheme);

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