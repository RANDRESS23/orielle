import { useState } from "react"
import { Link } from "react-router-dom"
import { ChevronDown, Heart, Search, ShoppingCart, User } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Mobile menu button */}
        <button className="mr-2 block lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <div className="relative h-10 w-32 flex justify-center items-center font-display text-primary">
            ORIELLE
          </div>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="font-medium">DEMOS</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">Featured Demo</div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Explore our premium jewelry collection
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        href="/"
                      >
                        <div className="text-sm font-medium leading-none">Demo 1</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Classic jewelry showcase
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        href="/"
                      >
                        <div className="text-sm font-medium leading-none">Demo 2</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Modern collection display
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="font-medium">SHOP BY CATEGORIES</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        href="/"
                      >
                        <div className="text-sm font-medium leading-none">Rings</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Engagement, wedding, and fashion rings
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        href="/"
                      >
                        <div className="text-sm font-medium leading-none">Necklaces</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Pendants, chains, and statement pieces
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        href="/"
                      >
                        <div className="text-sm font-medium leading-none">Earrings</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Studs, hoops, and drop earrings
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        href="/"
                      >
                        <div className="text-sm font-medium leading-none">Bracelets</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Tennis bracelets, bangles, and charm bracelets
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="font-medium">BLOG</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        href="/"
                      >
                        <div className="text-sm font-medium leading-none">Latest Posts</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Read our newest jewelry insights
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        href="/"
                      >
                        <div className="text-sm font-medium leading-none">Jewelry Care</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Tips to maintain your precious pieces
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="font-medium">SHOP</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        href="/"
                      >
                        <div className="text-sm font-medium leading-none">New Arrivals</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Our latest jewelry collections
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        href="/"
                      >
                        <div className="text-sm font-medium leading-none">Best Sellers</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Our most popular jewelry pieces
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/">
                <NavigationMenuLink className="font-medium">ELEMENTS</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/">
                <NavigationMenuLink className="font-medium">FEATURES</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "fixed inset-0 top-16 z-50 flex flex-col bg-white p-6 transition-transform duration-300 ease-in-out lg:hidden",
            isMenuOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex flex-col space-y-4">
            <div className="border-b pb-2">
              <button className="flex w-full items-center justify-between py-2 font-medium">
                DEMOS <ChevronDown className="h-4 w-4" />
              </button>
            </div>
            <div className="border-b pb-2">
              <button className="flex w-full items-center justify-between py-2 font-medium">
                SHOP BY CATEGORIES <ChevronDown className="h-4 w-4" />
              </button>
            </div>
            <div className="border-b pb-2">
              <button className="flex w-full items-center justify-between py-2 font-medium">
                BLOG <ChevronDown className="h-4 w-4" />
              </button>
            </div>
            <div className="border-b pb-2">
              <button className="flex w-full items-center justify-between py-2 font-medium">
                SHOP <ChevronDown className="h-4 w-4" />
              </button>
            </div>
            <Link to="/" className="border-b pb-2 py-2 font-medium">
              ELEMENTS
            </Link>
            <Link to="/" className="border-b pb-2 py-2 font-medium">
              FEATURES
            </Link>
          </div>
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-4">
          <button aria-label="Search" className="hidden md:flex">
            <Search className="h-5 w-5" />
          </button>
          <Link to="/wishlist" aria-label="Wishlist" className="hidden md:flex">
            <Heart className="h-5 w-5" />
          </Link>
          <Link to="/cart" className="relative" aria-label="Shopping cart">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-xs font-medium text-amber-800">
              9
            </span>
          </Link>
          <Link to="/account" aria-label="Account" className="hidden md:flex">
            <User className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </header>
  )
}
