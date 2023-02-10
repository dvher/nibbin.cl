import { Card, CardActions, CardContent, CardMedia, Button, Typography, CardActionArea } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

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

const setFavorite = (id: number, isfavorite: boolean) => {
    if(isfavorite)
        return;
    fetch(`${process.env.NEXT_PUBLIC_API_ADDR}/setfavorite`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idProducto: id,
        }),
        mode: 'cors',
    }).then((res) => {
        if (!res.ok) {
            console.log('Error al agregar a favoritos');
            return;
        }
    });
}

export default function ProductComponent({ id, nombre, descripcion, precio, descuento, stock, imagen, isfavorite }: Product) {
    return (
        <Card sx={{ maxWidth: 345 }}>
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
                    <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'VAG Rounded Next' }}>
                        {descripcion}
                    </Typography>
                    <Typography variant="body2" color="blue" sx={{ fontFamily: 'VAG Rounded Next' }}>
                        <span style={ descuento ? { textDecoration: 'line-through', color: 'red' } : {} }>${precio}</span>
                        {descuento ? <span>{'   '} ${precio * (1 - descuento)}</span> : ''}
                        {stock <= 0 ? <span style={{ color: 'red' }}> - Sin stock</span> : ''}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button size="small" onClick={() => setFavorite(id, isfavorite)}>{!isfavorite ? <FavoriteBorderIcon /> : <FavoriteIcon />}</Button>
                <Button size="small"><AddShoppingCartIcon /></Button>
            </CardActions>
        </Card>
    );
}