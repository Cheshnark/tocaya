import { useState, useEffect } from "react"

interface Section {
  _id: string;
  name: string;
  images: Array<string>
}

export function useFetch(url:string) {
  const [data, setData] = useState< null | Array<Section>>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [controller, setController] = useState<AbortController | null>(null)
  const [hasChanged, setHasChanged] = useState(false)

  useEffect(() => {
    const abortController = new AbortController()
    setController(abortController)

    setLoading(true)
    fetch(url, {signal: abortController.signal})
      .then((response => response.json()))
      .then((data) => setData(data))
      .catch((error) => {
        if(error.name == 'AbortError') {
          console.log('Request cancelled');
        }else {
          setError(error)
        }
      })
      .finally(() => setLoading(false))

    return () => abortController.abort()
  }, [hasChanged])

  const handleCancelRequest = () => {
    if(controller) {
      controller.abort()
      setError("Request cancelled")
    }
  }

  return { data, loading, error, handleCancelRequest, hasChanged, setHasChanged }
}