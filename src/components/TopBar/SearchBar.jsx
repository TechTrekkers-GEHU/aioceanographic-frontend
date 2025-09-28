import { useState, useRef, useEffect } from "react";
import { cn } from "../../utils/cn";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";

export function SearchBox({
  onSearch,
  disabled = false,
  placeholder = "Search the site",
  className,
  searchPath = "/search",
  navigateOnSearch = true,
  debounceMs = 300,
  showClear = true,
}) {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);
  const debounceRef = useRef(null);

  function performSearch(query) {
    const q = String(query ?? "").trim();
    if (!q || disabled) return;
    if (typeof onSearch === "function") {
      onSearch(q);
    }
    if (navigateOnSearch) {
      const url = `${searchPath}?q=${encodeURIComponent(q)}`;
      window.location.assign(url);
    }
    setValue("");
  }

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    performSearch(value);
  }

  function handleChange(e) {
    const next = e.target.value;
    setValue(next);
    if (debounceMs > 0 && typeof onSearch === "function") {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => onSearch(next.trim()), debounceMs);
    }
  }

  function handleClear() {
    setValue("");
    inputRef.current?.focus();
  }

  function handleKeyDown(e) {
    if (e.key === "Escape") {
      handleClear();
    }
  }

  return (
    <form
      role="search"
      aria-label="Site search"
      onSubmit={handleSubmit}
      className={cn(
        "mx-4 w-full max-w-xl rounded-4xl border border-gray-300 bg-card px-4 py-3 shadow-sm",        className
      )}
    >
      <div className="flex items-center gap-3">
        <AiOutlineSearch className="size-4 text-muted-foreground" aria-hidden="true" />
        <label htmlFor="site-search-input" className="sr-only">Search the site</label>
        <input
          id="site-search-input"
          ref={inputRef}
          type="search"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
          disabled={disabled}
          aria-disabled={disabled}
          aria-label="Search"
          autoComplete="off"
        />
        {showClear && value && (
          <button
            type="button"
            onClick={handleClear}
            className="inline-flex size-6 items-center justify-center rounded-md text-foreground hover:bg-muted/10"
            aria-label="Clear search"
            title="Clear"
            disabled={disabled}
          >
            <AiOutlineClose className="size-4" aria-hidden="true" />
          </button>
        )}
      </div>
    </form>
  );
}
