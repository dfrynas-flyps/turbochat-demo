import React, { useEffect, useState } from 'react'

import { Box, CircularProgress } from '@mui/material'
import styled from '@mui/material/styles/styled'

import { getApiAdapter } from '../../api-adapter'

interface ImageLoaderProps {
  src: string
  onClick?: () => void
}

const apiAdapter = getApiAdapter()

/**
 * A component that handles loading images from various sources
 * This is helpful for ensuring images persist across page refreshes
 */
const ImageLoader: React.FC<ImageLoaderProps> = ({ src, onClick }) => {
  const [resolvedSrc, setResolvedSrc] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    if (!apiAdapter.hasImageUpload()) {
      console.error('ImageLoader requires an API adapter with image upload feature')
      setError('Image loading is not available')
      setIsLoading(false)
      return
    }

    const loadImage = async () => {
      if (!src) {
        setIsLoading(false)
        setError('No image source provided')
        return
      }

      try {
        setIsLoading(true)
        setError(null)

        const url = await apiAdapter.getImageUrl(src)

        if (isMounted) {
          setResolvedSrc(url)
          setIsLoading(false)
        }
      } catch (error) {
        console.error('Error loading image:', error)
        if (isMounted) {
          setError('Failed to load image')
          setIsLoading(false)
        }
      }
    }

    loadImage()

    return () => {
      isMounted = false
    }
  }, [src])

  if (isLoading) {
    return (
      <LoadingContainer>
        <CircularProgress size={24} />
      </LoadingContainer>
    )
  }

  if (error || !resolvedSrc) {
    return <ErrorContainer>{error || 'Failed to load image'}</ErrorContainer>
  }

  return <StyledImage src={resolvedSrc} onClick={onClick} />
}

const LoadingContainer = styled(Box, {
  shouldForwardProp: (prop) => !['width', 'height'].includes(prop as string),
})<{ width?: string | number; height?: string | number }>(({ width, height, theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.grey[100],
  width: width || '100%',
  height: height || '160px',
  borderRadius: '4px',
}))

const ErrorContainer = styled(Box, {
  shouldForwardProp: (prop) => !['width', 'height'].includes(prop as string),
})<{ width?: string | number; height?: string | number }>(({ width, height, theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.grey[100],
  color: theme.palette.error.main,
  width: width || '100%',
  height: height || '160px',
  fontSize: '14px',
  borderRadius: '4px',
  padding: '16px',
  textAlign: 'center',
}))

const StyledImage = styled('img')({
  maxWidth: '100%',
  display: 'block',
  margin: 'auto',
})

export default ImageLoader
