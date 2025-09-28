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
    const [isMobileOpen, setIsMobileOpen] = useState(false);
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
        setIsMobileOpen(false);
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
            setIsMobileOpen(false);
        }
    }

    return (
        <>
            <form
                role="search"
                aria-label="Site search"
                onSubmit={handleSubmit}
                className={cn(
                    "hidden sm:block mx-4 w-full max-w-3xl rounded-4xl border border-gray-300 bg-card px-4 py-2 shadow-sm",
                    className
                )}
            >
                <div className="flex items-center gap-3">
                    <AiOutlineSearch className="size-4 text-muted-foreground" aria-hidden="true" />
                    <label htmlFor="site-search-input" className="sr-only">
                        Search the site
                    </label>
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

            <button
                type="button"
                className="sm:hidden p-2 text-gray-600 hover:text-gray-800"
                onClick={() => setIsMobileOpen(true)}
                aria-label="Open search"
            >
                <AiOutlineSearch className="size-6" />
            </button>

            {isMobileOpen && (
                <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 sm:hidden">
                    <form
                        role="search"
                        aria-label="Mobile site search"
                        onSubmit={handleSubmit}
                        className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 shadow-lg"
                    >
                        <div className="flex items-center gap-3">
                            <AiOutlineSearch className="size-5 text-gray-500" aria-hidden="true" />
                            <input
                                ref={inputRef}
                                type="search"
                                value={value}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                                placeholder={placeholder}
                                className="flex-1 bg-transparent text-base outline-none placeholder:text-gray-400"
                                autoFocus
                            />
                            <button
                                type="button"
                                onClick={() => setIsMobileOpen(false)}
                                className="inline-flex size-6 items-center justify-center rounded-md text-gray-700 hover:bg-gray-200"
                                aria-label="Close search"
                            >
                                <AiOutlineClose className="size-4" />
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}
