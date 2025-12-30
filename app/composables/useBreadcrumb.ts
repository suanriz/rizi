export const useBreadcrumb = () => {
  const currentTitle = useState<string | null>(
    'breadcrumb-current-title',
    () => null
  )

  const setTitle = (title: string | null) =>
    currentTitle.value = title

  return { currentTitle, setTitle }
}
