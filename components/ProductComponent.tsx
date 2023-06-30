import { Card, CardActions, CardContent, CardMedia, Button, Typography, CardActionArea } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from "react";

type Product = {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    descuento: number;
    stock: number;
    imagen: string;
    isfavorite: boolean;
}

export default function ProductComponent({ id, nombre, descripcion, precio, descuento, stock, imagen, isfavorite }: Product) {

    const [favorito, setFavorito] = useState(isfavorite);

    const toggleFavorite = (id: number) => {
        fetch(`${process.env.NEXT_PUBLIC_API_ADDR}/togglefavorite`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idProducto: id,
            }),
            mode: 'cors',
            credentials: 'include',
        }).then((res) => {
            if (!res.ok) {
                console.log(favorito ? 'Error al quitar de favoritos' : 'Error al agregar a favoritos');
                return;
            }
            setFavorito(!favorito);
        });
    }

    return (
        <Card sx={{ maxWidth: 345 }} className="card-producto">
            <CardActionArea href={`/product/${id}`}>
                <CardMedia
                    component="img"
                    image={imagen}
                    alt={nombre}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{ fontFamily: 'VAG Rounded Next' }}>
                        {nombre}
                    </Typography>
                    <Typography variant="body2" color="text.primary" sx={{ fontFamily: 'VAG Rounded Next' }}>
                        {descripcion}
                    </Typography>
                    <Typography variant="body2" color="primary" sx={{ fontFamily: 'VAG Rounded Next' }}>
                        <span style={ descuento ? { textDecoration: 'line-through', color: 'red' } : {} }>${precio}</span>
                        {descuento ? <span>{'   '} ${precio * (1 - descuento)}</span> : ''}
                        {stock <= 0 ? <span style={{ color: 'red' }}> - Sin stock</span> : ''}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button size="small" onClick={() => toggleFavorite(id)}>{!favorito ? <FavoriteBorderIcon color="primary" /> : <FavoriteIcon color="primary" />}</Button>
                <Button size="small"><AddShoppingCartIcon color="primary" /></Button>
            </CardActions>
        </Card>
    );
}