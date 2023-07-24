using BETarjetaCredito.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860
//Creamos un nuevo controlador

namespace BETarjetaCredito.Controllers
{
    //Creamos 2 endpoints
    //1 - Para obtener el listado de las tarjetas de credito
    //2 - Para poder guardar las tarjetas de credito

    //ruta => Se la llama con API
    [Route("api/[controller]")]
    [ApiController]
    public class TarjetaController : ControllerBase
    {
        //Variable privada de sol lectura
        private readonly AplicationDBContext _context;

        //Creamos contructor y hacemos una inyeccion de dependencias
        public TarjetaController(AplicationDBContext context)
        {
            _context = context;
        }
        //4 EndPoints

        // GET: api/<TarjetaController>
        [HttpGet]

        //1 - Para obtener el listado de las tarjetas de credito
        //Metodo publico asincrono => devuelve una tarea con la interfaz IActionResult
        public async Task<IActionResult> Get()
        {
            try
            {
                //al ser asincrono le decimos con await que espere hasta recibir los datos
                var listTarjetas = await _context.TarjetaCredito.ToListAsync();
                //retornamos estatus 200(Ok) con el listado de tarjetas
                return Ok(listTarjetas);
            }
            catch (Exception ex)
            {
                //retornamos estatus 400 error(BadRequest)
                return BadRequest(ex.Message);
            }
            
        }

        //2 - Para poder guardar las tarjetas de credito

        //Post para almacenar los datos

        // POST api/<TarjetaController>
        [HttpPost]

        //Metodo asincrono => devuelve una tarea interfaz IActionResult
        //Le pasamos por parametro un objeto de tipo TarjetaCredito tarjeta (tarjeta)
        public async Task<IActionResult> Post([FromBody] TarjetaCredito tarjeta)
        {
            try
            {
                //agregamos nueva tarjeta
                _context.Add(tarjeta);
                //guardamos cambios con metodo SaveChangesAsync() diciendole que espere (await)
                await _context.SaveChangesAsync();
                //retornamos el objeto tarjeta
                return Ok(tarjeta);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Put pa actualizar los datos
        // PUT api/<TarjetaController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] TarjetaCredito tarjeta)
        {
            try
            {
                //Si el id es distinto de la tarjeta.Id => NotFound
                if (id != tarjeta.Id)
                {
                    return NotFound();
                }
                //actualizamos la tarjeta con el metodo Update()
                _context.Update(tarjeta);
                //guardamos cambios con metodo SaveChangesAsync() diciendole que espere (await)
                await _context.SaveChangesAsync();
                //Si todo esta bien lanzara el siguiente mensaje:
                return Ok(new { message = "La tarjeta fue actualizada con exito!" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Delete para eliminar datos
        // DELETE api/<TarjetaController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                //1º Buscar la tarjeta dentro de los objetos TarjetaCredito
                //mediante una busqueda asincrona del id
                var tarjeta = await _context.TarjetaCredito.FindAsync(id);

                //Si la tarjeta es = null => no encontro nada
                if (tarjeta == null)
                {
                    return NotFound();
                }
                //En caso contrario la removemos
                _context.TarjetaCredito.Remove(tarjeta);
                //Guardamos cambios
                await _context.SaveChangesAsync();
                //Si todo esta bien lanzara el siguiente mensaje:
                return Ok(new { message = "La tarjeta fue eliminada con exito!" });

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
