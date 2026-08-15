import React, { useState } from "react";
import { Link } from "react-router";

export default function PanelComponent({ item }) {
    const [open, setOpen] = useState(false);

    const hasSubmenu =
        Array.isArray(item.submenu) && item.submenu.length > 0;

    const role = localStorage.getItem("role");

    // Don't render menu items the current role cannot access
    if (!item.roles?.includes(role)) {
        return null;
    }

    const visibleSubmenu =
        item.submenu?.filter((sub) => sub.roles?.includes(role)) ?? [];

    return (
        <div className="mb-1">
            {/* =====================================================
                MAIN MENU ITEM
            ====================================================== */}
            <button
                type="button"
                onClick={() => hasSubmenu && setOpen((prev) => !prev)}
                className={`
                    group relative flex w-full items-center gap-3
                    rounded-xl px-3 py-2.5
                    text-left
                    transition-all duration-200

                    ${
                        open
                            ? "bg-[#232F72] text-white shadow-sm"
                            : "text-slate-300 hover:bg-[#232F72]/70 hover:text-white"
                    }

                    ${hasSubmenu ? "cursor-pointer" : "cursor-default"}
                `}
            >
                {/* Active indicator */}
                {open && (
                    <span
                        className="
                            absolute left-0 top-1/2
                            h-7 w-1
                            -translate-y-1/2
                            rounded-r-full
                            bg-[#36ADA3]
                        "
                    />
                )}

                {/* Icon */}
                <span
                    className={`
                        flex h-9 w-9 shrink-0 items-center justify-center
                        rounded-lg
                        transition-all duration-200

                        ${
                            open
                                ? "bg-[#2F578A] text-[#36ADA3]"
                                : "bg-white/10 text-slate-300 group-hover:bg-[#2F578A] group-hover:text-[#36ADA3]"
                        }
                    `}
                >
                    <i className={`${item.icon} text-base`} />
                </span>

                {/* Label */}
                <span
                    className={`
                        flex-1 truncate text-sm font-medium
                        ${
                            open
                                ? "text-white"
                                : "text-slate-300 group-hover:text-white"
                        }
                    `}
                >
                    {item.label}
                </span>

                {/* Arrow */}
                {hasSubmenu && (
                    <span
                        className={`
                            flex h-7 w-7 items-center justify-center
                            rounded-md
                            text-slate-400
                            transition-all duration-200

                            ${
                                open
                                    ? "rotate-90 bg-white/10 text-[#36ADA3]"
                                    : "group-hover:text-white"
                            }
                        `}
                    >
                        <i className="fa fa-angle-right text-xs" />
                    </span>
                )}
            </button>

            {/* =====================================================
                SUBMENU
            ====================================================== */}
            {hasSubmenu && (
                <div
                    className={`
                        grid overflow-hidden
                        transition-all duration-300 ease-in-out

                        ${
                            open
                                ? "grid-rows-[1fr] opacity-100"
                                : "grid-rows-[0fr] opacity-0"
                        }
                    `}
                >
                    <div className="min-h-0 overflow-hidden">
                        <div className="relative ml-7 mt-1 space-y-1 pl-5">

                            {/* Vertical submenu line */}
                            <span
                                className="
                                    absolute left-1 top-0 bottom-2
                                    w-px
                                    bg-[#2F578A]/60
                                "
                            />

                            {visibleSubmenu.map((sub, idx) => (
                                <Link
                                    key={sub.route || idx}
                                    to={sub.route || "#"}
                                    className="
                                        group relative flex items-center
                                        rounded-lg px-3 py-2
                                        text-sm text-slate-400
                                        transition-all duration-150

                                        hover:bg-[#232F72]/60
                                        hover:text-white
                                    "
                                >
                                    {/* Submenu dot */}
                                    <span
                                        className="
                                            absolute left-[-1.15rem]
                                            h-2 w-2
                                            rounded-full
                                            border-2
                                            border-[#121358]
                                            bg-[#2F578A]

                                            transition-all duration-150

                                            group-hover:bg-[#36ADA3]
                                            group-hover:ring-2
                                            group-hover:ring-[#36ADA3]/20
                                        "
                                    />

                                    <span className="truncate">
                                        {sub.label}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

