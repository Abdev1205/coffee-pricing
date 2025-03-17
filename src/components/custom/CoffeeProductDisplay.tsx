import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import coffeeData from "@/assets/response";
import { Badge } from "../ui/badge";
import { Search } from "lucide-react";
import { Input } from "../ui/input";

// Type definitions for our data structure
interface LocalizedName {
  code: string;
  value: string;
}

interface FilterSelection {
  beverageFamily: string;
  cupSize: string;
  blendType: string | null;
  milkType: string | null;
  flavorType: string | null;
  extraShotEspresso: string | null;
  extraShotFlavor: string | null;
  temperatureProfile: string | null;
}

interface Images {
  beverageFamily: string | null;
  cupSize: string | null;
  blendType: string | null;
  milkType: string | null;
  flavorType: string | null;
  extraShotEspresso: string | null;
  extraShotFlavor: string | null;
  temperatureProfile: string | null;
}

interface SpecialRule {
  name: string;
  adjustment: number;
}

interface Breakdown {
  cupSize: number;
  beverageFamily: number;
  specialRules: SpecialRule[];
}

interface Bill {
  total: number;
  currency: string;
  breakdown: Breakdown;
}

interface CoffeeProduct {
  productId: string;
  rank: number;
  names: {
    default: string;
    localized: LocalizedName[];
  };
  filterSelection: FilterSelection;
  images: Images;
  bill: Bill;
  amount: number;
  timestamp: string;
  breakdown: Breakdown;
}

// Sample data
const coffeeProducts: CoffeeProduct[] | any = coffeeData;

// Collection of the potential filters
const filters = {
  beverageFamily: [
    "All",
    "Brewed coffee",
    "Caffè Latte",
    "Espresso",
    "Cold Brew",
    "Tea",
  ],
  cupSize: ["All", "Small", "Medium", "Large", "Extra Large"],
};

const CoffeeProductDisplay: React.FC = () => {
  const [selectedBeverageFamily, setSelectedBeverageFamily] = useState("All");
  const [selectedCupSize, setSelectedCupSize] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<CoffeeProduct[]>([]);

  // Filter the products based on selections and search term
  useEffect(() => {
    const filtered = coffeeProducts?.filter((product: any) => {
      // Filter by beverage family
      const matchesFamily =
        selectedBeverageFamily === "All" ||
        product.filterSelection.beverageFamily === selectedBeverageFamily;

      // Filter by cup size
      const matchesSize =
        selectedCupSize === "All" ||
        product.filterSelection.cupSize === selectedCupSize;

      // Filter by search term (product name or ID)
      const matchesSearch =
        searchTerm === "" ||
        product.names.default
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        product.productId.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesFamily && matchesSize && matchesSearch;
    });

    setFilteredProducts(filtered);
  }, [selectedBeverageFamily, selectedCupSize, searchTerm]);

  // Format the date for display
  const formatDate = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="container mx-auto">
      {/* Sticky navbar with filters and search */}
      <div className="sticky top-0 z-10 bg-white shadow-md">
        <div className="p-4 space-y-4">
          {/* Search bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search by product name or ID..."
              className="pl-10 rounded-[0.5rem]"
              style={{ borderRadius: "0.5rem" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col justify-center gap-4 md:flex-row">
            <div className="w-full md:w-1/3">
              <label className="block mb-2 text-sm font-medium">
                Beverage Type
              </label>
              <Select
                value={selectedBeverageFamily}
                onValueChange={setSelectedBeverageFamily}
              >
                <SelectTrigger
                  className="w-full rounded-[0.5rem]"
                  style={{ borderRadius: "0.5rem" }}
                >
                  <SelectValue placeholder="Select beverage type" />
                </SelectTrigger>
                <SelectContent>
                  {filters.beverageFamily.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-full md:w-1/3">
              <label className="block mb-2 text-sm font-medium">Cup Size</label>
              <Select
                value={selectedCupSize}
                onValueChange={setSelectedCupSize}
              >
                <SelectTrigger
                  className="w-full rounded-[0.5rem]"
                  style={{ borderRadius: "0.5rem" }}
                >
                  <SelectValue placeholder="Select cup size" />
                </SelectTrigger>
                <SelectContent>
                  {filters?.cupSize.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Products grid with top padding to account for sticky navbar */}
      <div className="p-4 pt-6">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
          {filteredProducts?.map((product) => (
            <Card
              key={product.productId}
              className="overflow-hidden transition-shadow shadow-lg hover:shadow-xl"
            >
              {/* Image section */}
              <div className="relative h-48 bg-gray-100">
                {product.images.beverageFamily ? (
                  <img
                    src={product.images.beverageFamily}
                    alt={product.names.default}
                    className="object-contain w-full h-full"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-gray-200">
                    <span className="text-gray-500">No image available</span>
                  </div>
                )}
                <Badge className="absolute top-2 right-2">
                  {product.filterSelection.beverageFamily}
                </Badge>
              </div>

              {/* Content section */}
              <CardHeader>
                <CardTitle>{product.names.default}</CardTitle>
                <CardDescription>
                  {product.filterSelection.cupSize} •{" "}
                  {product.filterSelection.blendType || "Regular Blend"}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-2">
                  {/* Product ID */}
                  <div className="text-xs text-gray-500">
                    ID: {product.productId.slice(0, 8)}...
                  </div>

                  {/* Product attributes */}
                  <div className="flex flex-wrap gap-2">
                    {product.filterSelection.milkType && (
                      <Badge variant="outline">
                        {product.filterSelection.milkType}
                      </Badge>
                    )}
                    {product.filterSelection.flavorType && (
                      <Badge variant="outline">
                        {product.filterSelection.flavorType}
                      </Badge>
                    )}
                    {product.filterSelection.temperatureProfile && (
                      <Badge variant="outline">
                        {product.filterSelection.temperatureProfile}
                      </Badge>
                    )}
                  </div>

                  {/* Special offers */}
                  {product?.breakdown?.specialRules?.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm font-medium">Special offers:</p>
                      <ul className="text-sm text-gray-600">
                        {product?.breakdown?.specialRules?.map(
                          (rule, index) => (
                            <li key={index} className="flex justify-between">
                              <span>{rule.name}</span>
                              <span
                                className={
                                  rule.adjustment < 0
                                    ? "text-green-600"
                                    : "text-gray-600"
                                }
                              >
                                {rule.adjustment < 0 ? "-" : "+"}
                                {Math.abs(rule.adjustment).toFixed(2)}
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>

              <CardFooter className="flex justify-between border-t bg-gray-50">
                <div className="text-sm text-gray-500">
                  Added: {formatDate(product.timestamp)}
                </div>
                <div className="text-lg font-bold">
                  ${(product.bill.total / 100).toFixed(2)}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredProducts?.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-lg text-gray-500">
              No products match your search criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoffeeProductDisplay;
