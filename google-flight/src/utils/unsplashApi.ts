// src/utils/unsplashApi.ts
const UNSPLASH_API_URL = "https://api.unsplash.com";
const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_KEY;

export interface UnsplashPhoto {
  id: string;
  urls: {
    small: string;
    regular: string;
    full: string;
  };
  alt_description?: string;
  description?: string;
  user: {
    name: string;
  };
  premium: boolean;
}

export interface UnsplashSearchResponse {
  results: UnsplashPhoto[];
  total: number;
  total_pages: number;
}

export const searchUnsplashPhotos = async (
  query: string,
  page: number = 1,
  perPage: number = 10
): Promise<UnsplashSearchResponse> => {
  try {
    const params = new URLSearchParams({
      query,
      page: page.toString(),
      per_page: perPage.toString(),
      order_by: "relevant",
      orientation: "landscape",
      content_filter: "low",
    });

    const response = await fetch(
      `${UNSPLASH_API_URL}/search/photos?${params}`,
      {
        headers: {
          Authorization: `Client-ID ${ACCESS_KEY}`,
          "Accept-Version": "v1",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`);
    }

    const data: UnsplashSearchResponse = await response.json();

    // Filtrar solo fotos no premium
    const filteredResults = data.results.filter((photo) => !photo.premium);

    return {
      ...data,
      results: filteredResults,
    };
  } catch (error) {
    throw error;
  }
};

// Función para obtener imagen específica de una ciudad
export const getCityImageFromUnsplash = async (
  cityName: string
): Promise<string | null> => {
  try {
    // Buscar con términos específicos para mejores resultados
    const searchTerms = [
      `${cityName} cityscape`,
      `${cityName} skyline`,
      `${cityName} landmark`,
      cityName,
    ];

    for (const term of searchTerms) {
      const response = await searchUnsplashPhotos(term, 1, 5);

      if (response.results.length > 0) {
        // Retornar la primera imagen de buena calidad
        return response.results[0].urls.regular;
      }
    }

    return null;
  } catch {
    return null;
  }
};

// Función para actualizar imágenes de destinos favoritos
export const updateDestinationImages = async (
  destinations: { city: string; code: string }[]
) => {
  const imagePromises = destinations.map(async (dest) => {
    const imageUrl = await getCityImageFromUnsplash(dest.city);
    return {
      ...dest,
      image: imageUrl || "/placeholder-city.jpg", // Fallback si no encuentra imagen
    };
  });

  return Promise.all(imagePromises);
};
