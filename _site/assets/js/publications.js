async function loadPublications(showSelectedOnly = false) {
  const bibPath = window.publicationsBibPath || "/publications.bib";

  const response = await fetch(bibPath);
  const bibText = await response.text();

  const entries = bibText.match(/@\w+\s*{[\s\S]*?\n}/g) || [];

  const publications = entries.map(entry => {
    const entryTypeMatch = entry.match(/@(\w+)\s*{/);
    const citeKeyMatch = entry.match(/@\w+\s*{\s*([^,\s]+)\s*,/);

    const entryType = entryTypeMatch ? entryTypeMatch[1] : "article";
    const citeKey = citeKeyMatch ? citeKeyMatch[1] : "";

    const getField = field => {
      const regex = new RegExp(
        field + "\\s*=\\s*[{\"]([\\s\\S]*?)[}\"]\\s*,?\\n",
        "i"
      );
      const match = entry.match(regex);
      return match ? match[1].trim() : "";
    };

    const journal = getField("journal");
    const booktitle = getField("booktitle");

    return {
      entryType,
      citeKey,
      title: getField("title"),
      author: getField("author"),
      venue: booktitle || journal,
      journal,
      booktitle,
      year: getField("year"),
      volume: getField("volume"),
      number: getField("number"),
      pages: getField("pages"),
      location: getField("location"),
      publisher: getField("publisher"),
      abstract: getField("abstract"),
      note: getField("note"),
      doi: getField("doi"),
      pdf: getField("pdf"),
      code: getField("code"),
      selected: getField("selected").toLowerCase() === "true"
    };
  });

  const list = document.getElementById("publication-list");
  if (!list) return;

  list.innerHTML = "";

  const publicationsToShow = showSelectedOnly
    ? publications.filter(pub => pub.selected)
    : publications;

  const formatAuthorName = author => {
    const name = author.trim();

    if (name.includes(",")) {
      const [last, first] = name.split(",").map(part => part.trim());
      return `${first} ${last}`;
    }

    return name;
  };

  const formatAuthors = authorString => {
    return authorString
      .split(/\s+and\s+/i)
      .map(formatAuthorName)
      .join(", ");
  };

  const getPdfPath = pdf => {
    if (!pdf) return "";

    if (
      pdf.startsWith("http://") ||
      pdf.startsWith("https://") ||
      pdf.startsWith("/")
    ) {
      return pdf;
    }

    const baseUrl = window.siteBaseUrl || "";

    return `${baseUrl}/assets/papers/${pdf}`.replace(/\/{2,}/g, "/");
  };

  const buildCleanBibtex = pub => {
    const fields = [
      ["title", pub.title],
      ["author", pub.author],
      ["journal", pub.journal],
      ["booktitle", pub.booktitle],
      ["year", pub.year],
      ["volume", pub.volume],
      ["number", pub.number],
      ["pages", pub.pages],
      ["location", pub.location],
      ["publisher", pub.publisher],
      ["doi", pub.doi],
      ["note", pub.note]
    ].filter(([, value]) => value);

    const fieldText = fields
      .map(([key, value]) => `  ${key}={${value}}`)
      .join(",\n");

    return `@${pub.entryType}{${pub.citeKey},\n${fieldText}\n}`;
  };

  publicationsToShow.forEach((pub, index) => {
    const item = document.createElement("li");

    const authors = formatAuthors(pub.author);

    const details = [];

    if (pub.venue) details.push(`<em>${pub.venue}</em>`);
    if (pub.year) details.push(pub.year);
    if (pub.volume) details.push(`vol. ${pub.volume}`);
    if (pub.number) details.push(`no. ${pub.number}`);
    if (pub.pages) details.push(`pp. ${pub.pages}`);
    if (pub.location) details.push(pub.location);
    if (pub.publisher) details.push(pub.publisher);

    const cleanBibtex = buildCleanBibtex(pub);

    item.innerHTML = `
      <strong>${pub.title}</strong><br>
      ${authors}<br>
      ${details.length ? `${details.join(", ")}.` : ""}
      ${pub.note ? `<br><span>${pub.note}</span>` : ""}

      <div class="pub-links">
        ${
          pub.abstract
            ? `<button type="button" class="pub-btn abstract-toggle-btn" data-index="${index}">ABS</button>`
            : ""
        }
        <button type="button" class="pub-btn bibtex-toggle-btn" data-index="${index}">BIB</button>
        ${
          pub.pdf
            ? `<a class="pub-btn" href="${getPdfPath(pub.pdf)}" target="_blank">PDF</a>`
            : ""
        }
        ${
          pub.code
            ? `<a class="pub-btn" href="${pub.code}" target="_blank">CODE</a>`
            : ""
        }
      </div>

      <div class="abstract-box" id="abstract-${index}" style="display: none;"></div>
      <pre class="bibtex-box" id="bibtex-${index}" style="display: none;"><code></code></pre>
    `;

    list.appendChild(item);

    const abstractBox = item.querySelector(`#abstract-${index}`);
    if (abstractBox) {
      abstractBox.textContent = pub.abstract;
    }

    const bibtexBox = item.querySelector(`#bibtex-${index} code`);
    if (bibtexBox) {
      bibtexBox.textContent = cleanBibtex;
    }
  });

  document.querySelectorAll(".abstract-toggle-btn").forEach(button => {
    button.addEventListener("click", event => {
      const index = event.target.dataset.index;
      const abstractBox = document.getElementById(`abstract-${index}`);

      if (!abstractBox) return;

      const isHidden = abstractBox.style.display === "none";
      abstractBox.style.display = isHidden ? "block" : "none";

      if (isHidden) {
        abstractBox.scrollTop = 0;
      }
    });
  });

  document.querySelectorAll(".bibtex-toggle-btn").forEach(button => {
    button.addEventListener("click", event => {
      const index = event.target.dataset.index;
      const bibtexBox = document.getElementById(`bibtex-${index}`);

      if (!bibtexBox) return;

      const isHidden = bibtexBox.style.display === "none";
      bibtexBox.style.display = isHidden ? "block" : "none";

      if (isHidden) {
        bibtexBox.scrollTop = bibtexBox.scrollHeight;
      }
    });
  });
}