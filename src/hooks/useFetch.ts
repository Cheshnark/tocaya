import { useState, useEffect } from "react"
import { T } from "vitest/dist/types-7cd96283";

interface Image {
  destination: string;
  encoding: string;
  fieldname: string;
  filename: string;
  mimetype: string;
  originalname: string;
  path: string;
  size: number
}
interface Section {
  _id: string;
  name: string;
  images: Image[];
  type: "section";
}
interface Product {
  productTitle: string;
  productInnerTitle: string;
  productDescription: string;
  productInnerDescription: string;
  images: Array<Image>;
  _id:string;
  type: "product";
}
interface Profile {
  _id: string;
  name: string;
  description: string;
  profilePicture: Image;
}
interface State<T> {
  data?: any;
  loading?: boolean;
  error?: string | null;
  controller?: AbortController;
  hasChanged: boolean;
  setHasChanged?: React.Dispatch<React.SetStateAction<boolean>>;
  handleCancelRequest: () => void
}

export function useFetch(url:string): State<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [controller, setController] = useState<AbortController | null>(null)
  const [hasChanged, setHasChanged] = useState<boolean>(false)

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