//Получение JSON
export const fetcher = async(url, lang) => {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept-Language': lang,
      }
    })


    if (!res.ok) {
      const error = new Error('An error occurred while fetching the data.')
      // Attach extra info to the error object.
      error.info = await res.json()
      error.status = res.status
      throw error
    }

    return res.json()

}
