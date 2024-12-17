package OpenLab.controllers;

import OpenLab.dtos.ApiResponseDTO;
import OpenLab.dtos.ClienteDTO.*;
import OpenLab.exceptions.ApplicationException;
import OpenLab.mappers.ClienteMapper;
import OpenLab.models.Cliente;
import OpenLab.services.IClienteService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/cliente")
public class ClienteController {

    private final IClienteService clienteService;
    private final ClienteMapper clienteMapper;

    public ClienteController(IClienteService userService, ClienteMapper clienteMapper) {
        this.clienteService = userService;
        this.clienteMapper = clienteMapper;
    }

    @GetMapping("/getAll")
    @Operation(summary = "Obtiene todos los clientes")
    public ResponseEntity<ApiResponseDTO<ClienteResponseDTO>> findAll() {
        try {
            List<Cliente> clientes = clienteService.findAll();
            List<ClienteResponseDTO> clientesDTO = clientes.stream()
                    .map(clienteMapper::toResponseDTO)
                    .collect(Collectors.toList());
            return new ResponseEntity<>(new ApiResponseDTO<>(true, "Exito", clientesDTO), HttpStatus.CREATED);
        } catch (ApplicationException e) {
            throw new ApplicationException(" Ha ocurrido un error " + e.getMessage());
        }
    }
//
//    @GetMapping("/{id}")
//    @Operation(summary = "Obtiene un estudiante en particular")
//    public ResponseEntity<ApiResponseDTO<ClienteResponseDTO>> findById(@PathVariable("id") Long id) {
//        Optional<Cliente> cliente = clienteService.findById(id);
//        if (cliente.isPresent()) {
//            ClienteResponseDTO clienteResponseDTO = clienteMapper.toResponseDTO(cliente.get());
//            String message = "Estudiante encontrado";
//            return new ResponseEntity<>(new ApiResponseDTO<>(true, message, clienteResponseDTO), HttpStatus.CREATED);
//        } else {
//            return new ResponseEntity<>(new ApiResponseDTO<>(false, "Cliente no encontrado", null), HttpStatus.NOT_FOUND);
//        }
//    }
//
//    @PostMapping("/add")
//    @Operation(summary = "Se agrega un cliente")
//    public ResponseEntity<ApiResponseDTO<ClienteResponseDTO>> save(@RequestBody @Valid ClienteRequestDTO clienteRequestDTO) {
//        Cliente cliente = clienteMapper.toEntity(clienteRequestDTO);
//        clienteService.save(cliente);
//        ClienteResponseDTO clienteResponseDTO = clienteMapper.toResponseDTO(cliente);
//        String message = "Cliente Registrado";
//        return new ResponseEntity<>(new ApiResponseDTO<>(true, message, clienteResponseDTO), HttpStatus.CREATED);
//    }
//
//    @PutMapping("/update")
//    @Operation(summary = "Se actualiza un cliente en particular")
//    public ResponseEntity<ApiResponseDTO<ClienteResponseDTO>> update(@RequestBody @Valid ClienteUpdateDTO clienteUpdateDTO) {
//        Cliente cliente = clienteMapper.toEntity(clienteUpdateDTO);
//        Cliente clienteActualizado = clienteService.update(cliente);
//        ClienteResponseDTO clienteResponseDTO = clienteMapper.toResponseDTO(clienteActualizado);
//        String message = "Estudiante Actualizado";
//        return new ResponseEntity<>(new ApiResponseDTO<>(true, message, clienteResponseDTO), HttpStatus.CREATED);
//    }
//
//    @DeleteMapping("/{id}")
//    @Operation(summary = "Se elimina un cliente en particular")
//    public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
//        clienteService.delete(id);
//        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//    }
//
//    @GetMapping("/email")
//    @Operation(summary = "Obtiene el perfil del cliente")
//    public ResponseEntity<ApiResponseDTO<ClienteResponseDTO>> findByEmail(@RequestParam String correo) {
//        Optional<Cliente> cliente = clienteService.findByEmail(correo);
//        if (cliente.isPresent()) {
//            ClienteResponseDTO clienteResponseDTO = clienteMapper.toResponseDTO(cliente.get());
//            String message = "Cliente encontrado";
//            return new ResponseEntity<>(new ApiResponseDTO<>(true, message, clienteResponseDTO), HttpStatus.CREATED);
//        } else {
//            return new ResponseEntity<>(new ApiResponseDTO<>(false, "Cliente no encontrado", null), HttpStatus.NOT_FOUND);
//        }
//    }
}
