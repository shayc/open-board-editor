async function searchLabels(
  query: any,
  options?: any
): Promise<LabelsSearchResults[]> {
  const language = 'eng';
  const limit = '10';

  const searchLabelsURL = `https://globalsymbols.com/api/v1/labels/search?query=${query}&language=${language}&language_iso_format=639-3&limit=${limit}`;
  const results = await fetch(searchLabelsURL);
  return results.json();
}

async function searchImages(query: any) {
  const results = query ? await searchLabels(query) : [];

  const images =
    results?.map((r, index) => ({
      id: r.picto?.id?.toString(),
      url: r.picto?.image_url,
      content_type: `image/${r.picto?.native_format}`,
      text: r.text,
    })) || [];

  return images;
}

const globalSymbols = { searchImages };

export default globalSymbols;

interface LabelsSearchResults {
  id: number;
  text: string;
  text_diacritised: null;
  description: string;
  language: string;
  picto: {
    id: number;
    symbolset_id: number;
    part_of_speech: string;
    image_url: string;
    native_format: string;
  };
}
