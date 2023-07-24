using BETarjetaCredito.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BETarjetaCredito
{
    //Hereda de DbContext => nos permite crear una instancia de nuestra base de datos para
    //almacenar datos, crear querys, crear nuestra BBDD a partir del modelo etc...
    public class AplicationDBContext:DbContext
    {
        //Configuramos los DbSet => mapear nuestros modelos (DbSet<TarjetaCredito>)
        //con la tabla de la BBDD (TarjetaCredito)
        public DbSet<TarjetaCredito> TarjetaCredito { get; set; }
        public AplicationDBContext(DbContextOptions<AplicationDBContext> options) : base(options)
        {

        }
    }
}
