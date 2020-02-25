import Mercury from '@postlight/mercury-parser'

const cnnindonesiaExtractor = {
  domain: 'cnnindonesia.com',
  title: {
    selectors: ['.title']
  },
  author: {
    selectors: ['.detail_text > b']
  },
  content: {
    selectors: ['.detail_text']
  }
}

const kompasExtractor = {
  domain: 'kompas.com',
  title: {
    selectors: ['.read__title']
  },
  author: {
    selectors: ['#penulis > a']
  },
  content: {
    selectors: ['.read__content'],
    clean: [
      'p > strong',
      '.ads-on-body',
      '.twitter-tweet'
    ]
  }
}

const tribunExtractor = {
  domain: "tribunnews.com",
  title: {
    selectors: ['#arttitle']
  },
  author: {
    selectors: []
  },
  content: {
    selectors: ['.txt-article'],
    clean: [
      '.txt-article > h4',
      'strong:first-of-type'
    ]
  },
  next_page_url: {
    selectors: ['.paging a']
  }
}

const detikExtractor = {
  domain: "detik.com",
  title: {
    selectors: []
  },
  author: {
    selectors: ['.author','.detail__author']
  },
  content: {
    selectors: [
      '.detail__body-text',
      '#detikdetailtext'
    ],
    clean: [
      '.twitter-tweet',
      '.detail__body-tag',
      '.detail_tag',
      '.embed',
      '#aevp_title'
    ]
  },
}

const liputan6Extractor = {
  domain: "liputan6.com",
  title: {
    selectors: ['.read-page--header--title']
  },
  author: {
    selectors: ['.read-page--header--author__name']
  },
  content: {
    selectors: [
      '.article-content-body'
    ],
    clean: [
      '.baca-juga',
      '.read-page--video-gallery--item',
      '.article-content-body__item-media'
    ]
  },
}

const tempoExtractor = {
  domain: "tempo.co",
  title: {
    selectors: ['h1[itemprop="headline"]']
  },
  author: {
    selectors: ['h4[itemprop="author"]']
  },
  content: {
    selectors: [
      'div[itemprop="articleBody"]'
    ],
    clean: [
        
    ]
  },
}

const okezoneExtractor = {
  domain: "okezone.com",
  title: {
    selectors: ['.title > h1']
  },
  author: {
    selectors: ['div.namerep']
  },
  content: {
    selectors: ['div[itemprop="articleBody"]'],
    clean: [
      '.detail-tag',
      '.detads-bottom'
    ]
  }
}

Mercury.addExtractor(cnnindonesiaExtractor);
Mercury.addExtractor(kompasExtractor);
Mercury.addExtractor(tribunExtractor);
Mercury.addExtractor(detikExtractor);
Mercury.addExtractor(liputan6Extractor);
Mercury.addExtractor(tempoExtractor);
Mercury.addExtractor(okezoneExtractor);

export default Mercury;