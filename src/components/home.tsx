import Footer from "./footer";
import TopBar from "./topBar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { toast } from "sonner";
import axios from "axios";
import { useState } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { FilePenLine, Trash, BadgePlus } from 'lucide-react';
import Orders from "./orders";

const BASE_URL = `https://management-backend-oskq.onrender.com`


interface Product {
    _id: string,
    name: string,
    sku: string,
    price: number,
    stock: number,
    category: string,
    minimumStockAlert: number
}

function Home() {

    // For Products
    const [products, setProducts] = useState<Product[]>([]);

    // For TopBar
    const [selected, setSelected] = useState<"home" | "products" | "orders">("home");

    // For Edit
    const [openEdit, setOpenEdit] = useState(false);
    const [editProduct, setEditProduct] = useState<Product | null>(null);

    // For Add
    const [openAdd, setOpenAdd] = useState(false);
    const [addProduct, setAddProduct] = useState<Product>({
        _id: "",
        name: "",
        sku: "",
        price: 0,
        stock: 0,
        category: "",
        minimumStockAlert: 0
    });




    if (selected === "products") {
        const getProducts = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/products`)
                setProducts(response.data)
            } catch (error) {
                toast.error("Failed to fetch products")
                console.error(error)
            }
        }
        getProducts()
    }

    const handleEdit = async () => {
        try {
            if (!editProduct) {
                return;
            }
            const response = await axios.put(`${BASE_URL}/api/products/${editProduct._id}`, {
                name: editProduct?.name,
                sku: editProduct?.sku,
                price: editProduct?.price,
                stock: editProduct?.stock,
                category: editProduct?.category,
                minimumStockAlert: editProduct?.minimumStockAlert
            })

            console.log("Edit Success:", response.data);
            toast.success("Edit successful!");

            setOpenEdit(false);
        } catch (error) {
            console.error("Edit Error:", error);
            toast.error("Edit failed. Please try again.");
        }
    }

    const handleDelete = async (id: string) => {
        try {
            const response = await axios.delete(`${BASE_URL}/api/products/${id}`)
            console.log("Delete Success:", response.data);
            setProducts(prev => prev.filter(p => p._id !== id));
            toast.success("Delete successful!");
        } catch (error) {
            console.error("Delete Error:", error);
            toast.error("Delete failed. Please try again.");
        }
    }


    const handleAdd = async () => {
        try {
            if (!addProduct) {
                return;
            }
            const response = await axios.post(`${BASE_URL}/api/products`, addProduct)
            console.log("Add Success:", response.data);
            toast.success("Add successful!");
            setOpenAdd(false);
        } catch (error) {
            console.error("Add Error:", error);
            toast.error("Add failed. Please try again.");
        }
    }


    return (
        <div className="flex flex-col min-h-screen w-screen font-sG">
            <TopBar onSelect={setSelected} />


            {selected === "home" && (
                <main className="grow w-full">
                    <div className="flex h-full w-full items-center justify-center">
                        <h1 className="text-2xl font-bold text-gray-800 px-5 mt-3">Home</h1>
                    </div>

                </main>
            )}


            {selected === "products" && (
                <main className="grow w-full">
                    <div className="flex items-center justify-between px-5 mt-3">
                        <h1 className="text-2xl font-bold text-gray-800">Products</h1>
                        <Button variant="ghost" onClick={() => setOpenAdd(true)}>
                            <BadgePlus />
                            <span>Add Product</span>
                        </Button>
                    </div>
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 p-4">
                        {products.map((product: Product) => (
                            <Card
                                key={product.sku}
                                className="rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-200 bg-white"
                            >
                                <CardHeader className="px-4 py-1 border-b">
                                    <CardTitle className="text-lg font-semibold text-gray-800">
                                        {product.name}
                                    </CardTitle>
                                    <CardDescription className="text-xs text-gray-500 flex justify-between">
                                        <div className="flex items-center gap-2 flex-col">
                                            {product.category}
                                            {product.stock < product.minimumStockAlert && (
                                                <div className="bg-red-100 text-red-700 rounded-md border border-red-200 flex items-center justify-center px-2 text-[8px] font-normal">
                                                    Few Left!
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <Button
                                                variant="ghost"
                                                onClick={() => {
                                                    setEditProduct(product);
                                                    setOpenEdit(true);
                                                }}
                                            >
                                                <FilePenLine />
                                            </Button>
                                            <Button variant="ghost" onClick={() => handleDelete(product._id)}>
                                                <Trash />
                                            </Button>
                                        </div>
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="px-4 py-1 text-sm text-gray-700 space-y-2">
                                    <div className="flex justify-between">
                                        <span>Price</span>
                                        <span className="font-semibold text-green-600">₹{product.price}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span>Stock</span>
                                        <span
                                            className={`font-semibold ${product.stock < product.minimumStockAlert ? "text-red-600" : "text-blue-600"
                                                }`}
                                        >
                                            {product.stock}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>

                        ))}

                    </div>

                    { /* For Edit */}
                    <Dialog open={openEdit} onOpenChange={setOpenEdit}>
                        <DialogContent className="sm:max-w-[425px]">

                            <DialogHeader>
                                <DialogTitle>Edit Product</DialogTitle>
                                <DialogDescription>
                                    Update the product details
                                </DialogDescription>
                            </DialogHeader>

                            {editProduct && (
                                <div className="grid gap-4">
                                    <div className="grid gap-3">
                                        <Label>Name</Label>
                                        <Input
                                            value={editProduct.name}
                                            onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                                        />
                                    </div>

                                    <div className="grid gap-3">
                                        <Label>SKU</Label>
                                        <Input
                                            value={editProduct.sku}
                                            onChange={(e) => setEditProduct({ ...editProduct, sku: e.target.value })}
                                        />
                                    </div>

                                    <div className="grid gap-3">
                                        <Label>Price</Label>
                                        <Input
                                            type="number"
                                            value={editProduct.price}
                                            onChange={(e) => setEditProduct({ ...editProduct, price: Number(e.target.value) })}
                                        />
                                    </div>

                                    <div className="grid gap-3">
                                        <Label>Stock</Label>
                                        <Input
                                            type="number"
                                            value={editProduct.stock}
                                            onChange={(e) => setEditProduct({ ...editProduct, stock: Number(e.target.value) })}
                                        />
                                    </div>

                                    <div className="grid gap-3">
                                        <Label>Category</Label>
                                        <Input
                                            value={editProduct.category}
                                            onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })}
                                        />
                                    </div>

                                    <div className="grid gap-3">
                                        <Label>Minimum Stock Alert</Label>
                                        <Input
                                            type="number"
                                            value={editProduct.minimumStockAlert}
                                            onChange={(e) => setEditProduct({ ...editProduct, minimumStockAlert: Number(e.target.value) })}
                                        />
                                    </div>
                                </div>
                            )}

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>

                                <Button onClick={handleEdit}>Save changes</Button>
                            </DialogFooter>

                        </DialogContent>
                    </Dialog>

                    { /* For Add */}
                    <Dialog open={openAdd} onOpenChange={setOpenAdd}>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Add Product</DialogTitle>
                                <DialogDescription>
                                    Add a new product to the inventory
                                </DialogDescription>
                            </DialogHeader>
                            {addProduct && (
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-3">
                                        <Label>Name</Label>
                                        <Input
                                            value={addProduct.name}
                                            onChange={(e) => setAddProduct({ ...addProduct, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label>Price</Label>
                                        <Input
                                            type="number"
                                            value={addProduct.price}
                                            onChange={(e) => setAddProduct({ ...addProduct, price: Number(e.target.value) })}
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label>Stock</Label>
                                        <Input
                                            type="number"
                                            value={addProduct.stock}
                                            onChange={(e) => setAddProduct({ ...addProduct, stock: Number(e.target.value) })}
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label>Category</Label>
                                        <Input
                                            value={addProduct.category}
                                            onChange={(e) => setAddProduct({ ...addProduct, category: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label>Minimum Stock Alert</Label>
                                        <Input
                                            type="number"
                                            value={addProduct.minimumStockAlert}
                                            onChange={(e) => setAddProduct({ ...addProduct, minimumStockAlert: Number(e.target.value) })}
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label>SKU</Label>
                                        <Input
                                            value={addProduct.sku}
                                            onChange={(e) => setAddProduct({ ...addProduct, sku: e.target.value })}
                                        />
                                    </div>
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button variant="outline">Cancel</Button>
                                        </DialogClose>
                                        <Button onClick={handleAdd}>Save</Button>
                                    </DialogFooter>
                                </div>
                            )}

                        </DialogContent>
                    </Dialog>


                </main>

            )}


            {selected === "orders" && (
                <main className="grow w-full">
                    <Orders />
                </main>
            )}


            <Footer />
        </div>
    );
}

export default Home;
